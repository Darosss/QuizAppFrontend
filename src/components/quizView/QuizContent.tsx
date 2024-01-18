import {Text, View} from "react-native";
import {QuizQuestionType, quizesEndpointsUrls, useApi} from "@api/";
import {Props} from "src/types";
import {styles} from "./styles";
import {SubmitQuizButton} from "./SubmitQuizButton";
import {NoQuizQuestions} from "./NoQuizQuestions";
import {useQuizContentContext} from "./QuizContentContext";
import {QuizControls} from "./QuizControls";
import {AnswersView} from "./AnswersView";
import {useSwipe} from "src/hooks";
import {useEffect} from "react";

export const QuizContent = ({navigation, route}: Props<"Quizes">) => {
  const {
    autoNextQuestionState: [autoNextQuestion],
    currentQuestionState: [currentQuestion, setCurrentQuestion],
    answeredQuestionsState: [answeredQuestions, setAnsweredQuestions],
  } = useQuizContentContext();
  const {
    apiData: {data, ApiError: ErrorComponent, Loading},
  } = useApi<QuizQuestionType[]>({
    url: quizesEndpointsUrls.quizesQuestions(route.params.quizId),
    method: "GET",
  });

  const {onTouchStart, onTouchEnd} = useSwipe(
    () => handleOnQuestionNavigate(1),
    () => handleOnQuestionNavigate(-1),
    6,
  );

  useEffect(() => {
    if (!autoNextQuestion || answeredQuestions.size <= 0) return;

    handleOnQuestionNavigate(1);
  }, [autoNextQuestion, answeredQuestions.size]);

  if (Loading) return <Loading />;
  if (ErrorComponent) return <ErrorComponent />;
  if (!data) return <NoQuizQuestions />;

  const currentQuestionData = data.at(currentQuestion);
  const questionsCount = data.length;
  const handleOnQuestionNavigate = (direction: -1 | 1) => {
    if (
      direction === 1 &&
      currentQuestion < answeredQuestions.size &&
      currentQuestion < questionsCount - 1
    ) {
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
  };

  return (
    <View
      style={styles.quizContentWrapper}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
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
              <SubmitQuizButton quizId={route.params.quizId} />
            ) : null}
            <Text style={styles.questionText}>{currentQuestionData.name}</Text>
          </View>
        ) : null}
      </View>

      {currentQuestionData ? (
        <AnswersView
          questionId={currentQuestionData._id}
          currentQuestionAnswerId={answeredQuestions.get(
            currentQuestionData._id,
          )}
          handleOnClickAnswer={answerId =>
            handleOnClickAnswer(currentQuestionData._id, answerId)
          }
        />
      ) : null}
    </View>
  );
};
