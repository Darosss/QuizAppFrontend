import {Button} from "react-native";
import {useAuthContext} from "./AuthContext";

export const LogoutButton = () => {
  const {
    actions: {logout},
  } = useAuthContext();
  return (
    <>
      <Button title="Logout" onPress={() => logout()} />
    </>
  );
};
