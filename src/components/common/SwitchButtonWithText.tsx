import {Switch, Text, View} from "react-native";
import {styles} from "./styles";

type SwitchButtonWithTextProps = {
  isEnabled: boolean;
  toggleEnabled: () => void;
  text: string;
};

export const SwitchButtonWithText = ({
  isEnabled,
  toggleEnabled,
  text,
}: SwitchButtonWithTextProps) => {
  return (
    <View style={styles.switchNextQuestionWrapper}>
      <Text>{text}</Text>
      <Switch onValueChange={toggleEnabled} value={isEnabled} />
    </View>
  );
};
