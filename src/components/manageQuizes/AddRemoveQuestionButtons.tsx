import {useEffect} from "react";
import {Button} from "react-native";
import {quizesEndpointsUrls, useApi} from "src/api";

type AddNewQuestionButtonProps = {
  quizId: string;
  onAddNew: () => void;
};

export const AddNewQuestionButton = ({
  quizId,
  onAddNew,
}: AddNewQuestionButtonProps) => {
  const {
    apiData: {data, ApiError},
    refetchData,
  } = useApi(
    {
      url: quizesEndpointsUrls.questions,
      method: "POST",
      body: {
        name: "Newly created",
        quizCategoryId: quizId,
      },
    },
    {manual: true},
  );

  useEffect(() => {
    if (data) onAddNew();
  }, [data]);

  if (ApiError) return <ApiError />;

  return <Button title="Add new" onPress={() => refetchData()} />;
};

type RemoveQuestionButtonProps = {
  questionId: string;
  onRemove: () => void;
};

export const RemoveQuestionButton = ({
  questionId,
  onRemove,
}: RemoveQuestionButtonProps) => {
  const {
    apiData: {data, ApiError},
    refetchData,
  } = useApi(
    {
      url: quizesEndpointsUrls.quizQuestionById(questionId),
      method: "DELETE",
    },
    {manual: true},
  );

  useEffect(() => {
    if (data) onRemove();
  }, [data]);

  if (ApiError) return <ApiError />;

  return <Button title="X" onPress={() => refetchData()} />;
};
