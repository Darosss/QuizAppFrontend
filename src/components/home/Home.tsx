import {Button} from "react-native";
import {Props} from "src/types";
import {LogoutButton, useAuthContext} from "@components/auth";

export const HomeScreen = ({navigation}: Props) => {
  const {
    state: {userInfo, isSignout},
    isAdmin,
  } = useAuthContext();

  return (
    <>
      {userInfo ? (
        <>
          <Button title={`Logged in as: ${userInfo.user.username}`} />
          {isAdmin ? (
            <Button
              title="Admin menu"
              onPress={() => navigation.navigate("Admin")}
            />
          ) : null}
        </>
      ) : null}

      {isSignout ? (
        <>
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
        </>
      ) : (
        <>
          <Button
            title="My profile"
            onPress={() => navigation.navigate("Profile")}
          />

          <Button
            title="Quizes"
            onPress={() => navigation.navigate("QuizCategories")}
          />
          <LogoutButton />
        </>
      )}
    </>
  );
};
