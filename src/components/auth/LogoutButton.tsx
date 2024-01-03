import {Button} from "react-native";

export const LogoutButton = () => {
  return (
    <>
      <Button
        title="Logout"
        onPress={() => console.log("This should log out user")}
      />
    </>
  );
};
