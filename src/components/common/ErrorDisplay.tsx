import {View, Text} from "react-native";
import {styles} from "./styles";
import {AppControlButtons} from "./AppControlButtons";

type ErrorDisplayProps = {
  description: string;
  statusCode: number;
  onTryAgain: () => void;
};

export const ErrorDisplay = ({
  description,
  statusCode,
  onTryAgain,
}: ErrorDisplayProps) => {
  return (
    <View style={styles.errorDisplayWrapper}>
      <View>
        <Text style={styles.errorTextInformation}>
          An error occured:{"\n"} {statusCode} {description}
        </Text>
      </View>
      <AppControlButtons onTryAgain={onTryAgain} />
    </View>
  );
};
