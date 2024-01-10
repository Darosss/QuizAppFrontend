import {View, Text} from "react-native";
import {styles} from "./styles";
import {AppControlButtons} from "./AppControlButtons";

type ErrorDisplayProps = {
  description: string;
  onTryAgain: () => void;
};

export const ErrorDisplay = ({description, onTryAgain}: ErrorDisplayProps) => {
  return (
    <View style={styles.errorDisplayWrapper}>
      <View>
        <Text style={styles.errorTextInformation}>
          An error occured:{"\n"} {description}
        </Text>
      </View>
      <AppControlButtons onTryAgain={onTryAgain} />
    </View>
  );
};
