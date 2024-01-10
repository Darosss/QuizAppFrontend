import {Props} from "src/types";
import {QuizContentContextProvider} from "./QuizContentContext";
import {QuizContent} from "./QuizContent";

export const QuizView = ({navigation, route}: Props<"Quizes">) => {
  return (
    <QuizContentContextProvider>
      <QuizContent navigation={navigation} route={route} />
    </QuizContentContextProvider>
  );
};
