import {useEffect, useState} from "react";
import {TextInput, View} from "react-native";
import {Props} from "src/types";
import {useAuthContext} from "./AuthContext";
import {
  type LoginApiCallResponseType,
  authEndpointsUrls,
  useApi,
} from "src/api";
import {CustomButton} from "../common";

export const LoginScreen = ({navigation, route}: Props<"Login">) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    apiData: {data, ApiError, Loading},
    refetchData,
  } = useApi<LoginApiCallResponseType>(
    {
      url: authEndpointsUrls.login,
      method: "POST",
      body: {username, password},
    },
    {manual: true},
  );

  const {
    actions: {login},
  } = useAuthContext();

  useEffect(() => {
    if (!data) return;

    login(data).then(() => {
      //TODO: add clear data here
    });
  }, [data]);

  if (Loading) return <Loading />;

  return (
    <>
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton title="Sign in" onPress={() => refetchData()} />
      </View>
      {ApiError ? <ApiError /> : null}
    </>
  );
};
