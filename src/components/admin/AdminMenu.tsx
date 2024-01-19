import {useNavigation} from "@react-navigation/native";
import {View} from "react-native";
import {PropsAdminStackNavigation} from "src/types";
import {CustomButton} from "../common";
import {useAuthContext} from "../auth";

export const AdminMenu = () => {
  const navigation = useNavigation<PropsAdminStackNavigation>();
  const {isAdmin} = useAuthContext();
  return (
    <View>
      <CustomButton
        title="Manage quizes"
        onPress={() => navigation.navigate("ManageQuizes")}
      />
      {isAdmin && isAdmin.superAdmin ? (
        <CustomButton
          title="Manage users"
          onPress={() => navigation.navigate("ManageUsers")}
        />
      ) : null}
    </View>
  );
};
