import {View, BackHandler} from "react-native";
import {styles} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {CustomButton} from ".";

type AppControlButtons = {
  onTryAgain: () => void;
};

export const AppControlButtons = ({onTryAgain}: AppControlButtons) => {
  const navigation = useNavigation();
  return (
    <View style={styles.errorDisplayButtons}>
      <CustomButton
        bgColor={"red"}
        title="Exit"
        onPress={() => BackHandler.exitApp()}
      />

      {navigation.canGoBack() ? (
        <CustomButton
          bgColor={"darkgoldenrod"}
          title="Back"
          onPress={() => navigation.goBack()}
        />
      ) : null}
      <CustomButton title="Try again" onPress={() => onTryAgain()} />
    </View>
  );
};
