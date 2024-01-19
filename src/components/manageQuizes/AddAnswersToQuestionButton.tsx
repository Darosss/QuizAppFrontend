import {useEffect} from "react";
import {Button} from "react-native";
import {quizesEndpointsUrls, useApi} from "src/api";

type AddAnswersToQuestionButtonProps = {questionId: string; onAdd: () => void};

export const AddAnswersToQuestionButton = ({
  questionId,
  onAdd,
}: AddAnswersToQuestionButtonProps) => {
  const {
    apiData: {data, ApiError},
    refetchData,
  } = useApi(
    {
      url: quizesEndpointsUrls.answers,
      method: "POST",
      body: {
        questionId,
        answers: [
          {name: "Valid answer", isCorrect: true},
          {name: "Invalid answer", isCorrect: false},
        ],
      },
    },
    {manual: true},
  );

  useEffect(() => {
    if (data) onAdd();
  }, [data]);

  if (ApiError) return <ApiError />;

  return <Button title="Add initial answers" onPress={() => refetchData()} />;
};
