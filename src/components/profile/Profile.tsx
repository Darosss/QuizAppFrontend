import {Text} from "react-native";
import {Props} from "src/types";

export const ProfileScreen = ({navigation, route}: Props<"Profile">) => {
  return (
    <Text>
      This is logged user profile {"\n"}
      This should be showed only for logged in users
      {"\n"}
      There will be user statistics, completed quizes, achievements or something
      like this
    </Text>
  );
};
