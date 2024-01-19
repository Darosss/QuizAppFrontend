import {useNavigation} from "@react-navigation/native";
import {View} from "react-native";
import {PropsAdminStackNavigation} from "src/types";
import {CustomButton} from "../common";

export const AdminMenu = () => {
  const navigation = useNavigation<PropsAdminStackNavigation>();
  return (
    <View>
      <CustomButton
        title="Manage quizes"
        onPress={() => navigation.navigate("ManageQuizes")}
      />
      <CustomButton
        title="Manage users"
        onPress={() => navigation.navigate("ManageUsers")}
      />
    </View>
  );
};
