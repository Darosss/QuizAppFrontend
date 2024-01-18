import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import * as SecureStore from "expo-secure-store";
import {
  type GetAuthStatusType,
  authEndpointsUrls,
  axiosInstance,
  setAxiosDefaultHeaderAuthorization,
} from "src/api";

import {
  AuthContextType,
  AuthContextStateType,
  LoginData,
  AuthContextDispatchAction,
} from "./types";

const SECURE_STORE_USER_TOKEN_NAME = "userToken";

export const AuthContext = React.createContext<AuthContextType | null>(null);

const initialAuthContextState: AuthContextStateType = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  userInfo: null,
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialAuthContextState);

  const callAnAuthStatusApi = useCallback(
    async (userToken: AuthContextStateType["userToken"]) =>
      await axiosInstance<GetAuthStatusType>({
        url: authEndpointsUrls.status,
        headers: {Authorization: `Bearer ${userToken}`},
        method: "GET",
      }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: AuthContextStateType["userToken"] = null;

      try {
        userToken = await SecureStore.getItemAsync(
          SECURE_STORE_USER_TOKEN_NAME,
        );

        const statusResponse = await callAnAuthStatusApi(userToken);

        if (!statusResponse?.data?.authenticated) {
          return dispatch({type: "LOGOUT"});
        }

        setAxiosDefaultHeaderAuthorization(userToken);
        dispatch({type: "RESTORE_TOKEN", payload: userToken});
      } catch (e) {
        dispatch({type: "LOGOUT"});
      }
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (state.userInfo || !state.userToken) return;
    callAnAuthStatusApi(state.userToken).then(response => {
      dispatch({type: "SET_USER_INFO", payload: response.data || null});
    });
  }, [state, callAnAuthStatusApi]);

  const actions = useMemo(
    () => ({
      login: async ({accessToken}: LoginData) => {
        SecureStore.setItem(SECURE_STORE_USER_TOKEN_NAME, accessToken);

        setAxiosDefaultHeaderAuthorization(accessToken);
        dispatch({type: "LOGIN", payload: accessToken});
      },
      logout: () => {
        SecureStore.deleteItemAsync(SECURE_STORE_USER_TOKEN_NAME).then(() => {
          dispatch({type: "LOGOUT"});
        });
      },
      register: async () => {
        //TODO: register things
        dispatch({type: "LOGIN", payload: "dummy-auth-token"});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{state, actions: actions}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): Required<AuthContextType> => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return authContext as AuthContextType;
};

function reducer(
  state: AuthContextStateType,
  action: AuthContextDispatchAction,
) {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        isSignout: false,
        userToken: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isSignout: true,
        userToken: null,
        userInfo: null,
      };

    case "SET_USER_INFO": {
      return {...state, userInfo: action.payload};
    }

    default:
      throw new Error("Invalid action type");
  }
}
