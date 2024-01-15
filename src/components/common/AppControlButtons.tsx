import {View, Button, BackHandler} from "react-native";
import {styles} from "./styles";
import {useNavigation} from "@react-navigation/native";

type AppControlButtons = {
  onTryAgain: () => void;
};

export const AppControlButtons = ({onTryAgain}: AppControlButtons) => {
  const navigation = useNavigation();
  return (
    <View style={styles.errorDisplayButtons}>
      <Button title="Exit" onPress={() => BackHandler.exitApp()} />

      {navigation.canGoBack() ? (
        <Button title="Back" onPress={() => navigation.goBack()} />
      ) : null}
      <Button title="Try again" onPress={() => onTryAgain()} />
    </View>
  );
};
