import {Text, View} from "react-native";
import {QuizQuestionType, QuizesEndpoints, useApi} from "@api/";
import {Props} from "src/types";
import {styles} from "./styles";
import {SubmitQuizButton} from "./SubmitQuizButton";
import {NoQuizQuestions} from "./NoQuizQuestions";
import {useQuizContentContext} from "./QuizContentContext";
import {QuizControls} from "./QuizControls";
import {AnswersView} from "./AnswersView";

export const QuizContent = ({navigation, route}: Props<"Quizes">) => {
  const {
    autoNextQuestionState: [autoNextQuestion],
    currentQuestionState: [currentQuestion, setCurrentQuestion],
    answeredQuestionsState: [answeredQuestions, setAnsweredQuestions],
  } = useQuizContentContext();
  const {
    apiData: {data, ApiError: ErrorComponent, Loading},
  } = useApi<QuizQuestionType[]>(
    QuizesEndpoints.QUIZES + route.params.quizId,
    "GET",
  );

  if (Loading) return <Loading />;
  if (ErrorComponent) return <ErrorComponent />;
  if (!data) return <NoQuizQuestions />;

  const currentQuestionData = data.at(currentQuestion);

  const questionsCount = data.length;
  const handleOnQuestionNavigate = (direction: -1 | 1) => {
    if (direction === 1 && currentQuestion < questionsCount - 1) {
      setCurrentQuestion(prevState => prevState + 1);
    } else if (direction === -1 && currentQuestion > 0) {
      setCurrentQuestion(prevState => prevState - 1);
    }
  };

  const handleOnClickAnswer = (questionId: string, answerId: string) => {
    setAnsweredQuestions(prevState => {
      const newMap = new Map(prevState);
      newMap.set(questionId, answerId);
      return newMap;
    });
    autoNextQuestion ? handleOnQuestionNavigate(1) : null;
  };

  return (
    <View style={styles.quizContentWrapper}>
      <View style={styles.quizHeader}>
        <Text style={styles.quizHeaderName}> {route.params.quizName}</Text>
        <QuizControls
          onPressNext={() => handleOnQuestionNavigate(1)}
          onPressPrevious={() => handleOnQuestionNavigate(-1)}
          questionsCount={questionsCount}
        />
        {currentQuestionData ? (
          <View style={styles.questionTextWrapper}>
            {data.length === answeredQuestions.size ? (
              <SubmitQuizButton />
            ) : null}
            <Text style={styles.questionText}>{currentQuestionData.name}</Text>
          </View>
        ) : null}
      </View>

      {currentQuestionData ? (
        <AnswersView
          questionId={currentQuestionData.id}
          currentQuestionAnswerId={answeredQuestions.get(
            currentQuestionData.id,
          )}
          handleOnClickAnswer={answerId =>
            handleOnClickAnswer(currentQuestionData.id, answerId)
          }
        />
      ) : null}
    </View>
  );
};
