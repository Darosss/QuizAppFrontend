import {View, TouchableOpacity, Text} from "react-native";
import {styles} from "./styles";
import {QuizAnswerType, quizesEndpointsUrls, useApi} from "src/api";
import {DataFailInfo} from "@components/common";

type AnswersViewProps = {
  questionId: string;
  handleOnClickAnswer: (answerId: string) => void;
  currentQuestionAnswerId?: string;
};

export const AnswersView = ({
  questionId,
  currentQuestionAnswerId: currentQuestionId,
  handleOnClickAnswer,
}: AnswersViewProps) => {
  const {
    apiData: {data, ApiError: ErrorComponent, Loading},
  } = useApi<QuizAnswerType>(
    quizesEndpointsUrls.quizesQuestionAnswers(questionId),
    "GET",
  );

  if (Loading) return <Loading />;
  if (ErrorComponent) return <ErrorComponent />;
  if (!data) return <DataFailInfo description="No answers. Try again later" />;

  return (
    <View style={styles.answersWrapper}>
      {data.answers.map((answer, answerIndex) => (
        <TouchableOpacity
          key={answerIndex}
          style={{
            ...styles.answerContent,
            backgroundColor: `${
              currentQuestionId === answer.id ? "green" : "transparent"
            }`,
          }}
          onPress={() => handleOnClickAnswer(answer.id)}>
          <Text style={styles.answerText}>{answer.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
