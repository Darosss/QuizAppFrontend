import {Text} from "react-native";
import {Props} from "src/types";

export const QuizCategories = ({
  navigation,
  route,
}: Props<"QuizCategories">) => {
  return (
    <Text>
      This is quizes categories screen {"\n"}
      There will be categories list
    </Text>
  );
};
