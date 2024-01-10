import {View, Button, Text} from "react-native";
import {useQuizContentContext} from "./QuizContentContext";
import {styles} from "./styles";
import {SwitchButtonWithText} from "@components/common";

type QuizControlsProps = {
  onPressPrevious: () => void;
  onPressNext: () => void;
  questionsCount: number;
};

export const QuizControls = ({
  onPressNext,
  onPressPrevious,
  questionsCount,
}: QuizControlsProps) => {
  const {
    autoNextQuestionState: [autoNextQuestion, setAutoNextQuestion],
    currentQuestionState: [currentQuestion],
    answeredQuestionsState: [answeredQuestions],
  } = useQuizContentContext();

  const nextQuestionDisabled =
    currentQuestion >= questionsCount - 1 ||
    currentQuestion === answeredQuestions.size;

  return (
    <>
      <View>
        <SwitchButtonWithText
          text="Auto text"
          isEnabled={autoNextQuestion}
          toggleEnabled={() => setAutoNextQuestion(prevState => !prevState)}
        />
      </View>
      <View style={styles.quizHeaderCurrentQuestion}>
        <Button
          {...(currentQuestion === 0 && {
            disabled: true,
          })}
          title="<"
          onPress={() => onPressPrevious()}
        />
        <Text>
          {currentQuestion + 1} / {questionsCount}
        </Text>
        <Button
          {...(nextQuestionDisabled && {
            disabled: true,
          })}
          title=">"
          onPress={() => onPressNext()}
        />
      </View>
    </>
  );
};
