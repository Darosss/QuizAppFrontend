import {Text} from "react-native";
import {Props} from "src/types";

export const QuizContent = ({navigation, route}: Props<"Quizes">) => {
  return (
    <Text>
      This is quiz content{"\n"}
      There will be quiz questions and answers
    </Text>
  );
};
