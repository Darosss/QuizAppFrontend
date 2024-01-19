import {useEffect} from "react";
import {quizesEndpointsUrls, useApi} from "src/api";
import {CustomButton} from "../common";

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

  return (
    <CustomButton title="Add initial answers" onPress={() => refetchData()} />
  );
};
