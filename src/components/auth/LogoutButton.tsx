import {useAuthContext} from "./AuthContext";
import {CustomButton} from "../common";

export const LogoutButton = () => {
  const {
    actions: {logout},
  } = useAuthContext();
  return (
    <>
      <CustomButton title="Logout" bgColor={"red"} onPress={() => logout()} />
    </>
  );
};
