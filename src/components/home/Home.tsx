import {Button} from "react-native";
import {Props} from "src/types";
import {LogoutButton} from "@components/auth";

export const HomeScreen = ({navigation}: Props) => {
  return (
    <>
      <Button
        title="My profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Quizes"
        onPress={() => navigation.navigate("QuizCategories")}
      />
      <LogoutButton />
    </>
  );
};
