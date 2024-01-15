import {GetAuthStatusType} from "src/api";

export type AuthContextType = {
  state: AuthContextStateType;
  actions: AuthContextActionsType;
};

export type LoginData = {
  accessToken: string;
};

export type AuthContextActionsType = {
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  register: () => Promise<void>;
};

export type AuthContextStateType = {
  isSignout: boolean;
  userToken: string | null;
  isLoading: boolean;
  userInfo: null | GetAuthStatusType;
};

export type RequiredUserTokenType = NonNullable<
  AuthContextStateType["userToken"]
>;

export type AuthContextDispatchAction =
  | {type: "RESTORE_TOKEN"; payload: AuthContextStateType["userToken"]}
  | {type: "LOGIN"; payload: RequiredUserTokenType}
  | {type: "SET_USER_INFO"; payload: AuthContextStateType["userInfo"]}
  | {type: "LOGOUT"};
