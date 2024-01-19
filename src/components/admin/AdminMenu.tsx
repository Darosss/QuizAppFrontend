import {useNavigation} from "@react-navigation/native";
import {Button, View} from "react-native";
import {PropsAdminStackNavigation} from "src/types";

export const AdminMenu = () => {
  const navigation = useNavigation<PropsAdminStackNavigation>();
  return (
    <View>
      <Button
        title="Manage quizes"
        onPress={() => navigation.navigate("ManageQuizes")}
      />
      <Button
        title="Manage users"
        onPress={() => navigation.navigate("ManageUsers")}
      />
    </View>
  );
};
