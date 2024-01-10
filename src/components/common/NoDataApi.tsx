import {useNavigation} from "@react-navigation/native";
import {View, Text} from "react-native";
import {styles} from "./styles";
import {AppControlButtons} from "./AppControlButtons";

type NoDataApiProps = {
  description?: string;
  onTryAgain: () => void;
};

export const NoDataApi = ({description, onTryAgain}: NoDataApiProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.errorDisplayWrapper}>
      <Text> {description || "No data"}</Text>

      <AppControlButtons onTryAgain={onTryAgain} />
    </View>
  );
};
