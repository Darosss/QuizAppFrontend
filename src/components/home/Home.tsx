import {Props} from "src/types";
import {LogoutButton, useAuthContext} from "@components/auth";
import {CustomButton} from "../common";

export const HomeScreen = ({navigation}: Props) => {
  const {
    state: {userInfo, isSignout},
    isAdmin,
  } = useAuthContext();

  return (
    <>
      {userInfo ? (
        <>
          <CustomButton
            bgColor={"darkgoldenrod"}
            title={`Logged in as: ${userInfo.user.username}`}
          />
          {isAdmin ? (
            <CustomButton
              title="Admin menu"
              onPress={() => navigation.navigate("Admin")}
            />
          ) : null}
        </>
      ) : null}

      {isSignout ? (
        <>
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </>
      ) : (
        <>
          <CustomButton
            title="My profile"
            onPress={() => navigation.navigate("Profile")}
          />

          <CustomButton
            title="Quizes"
            onPress={() => navigation.navigate("QuizCategories")}
          />
          <LogoutButton />
        </>
      )}
    </>
  );
};
