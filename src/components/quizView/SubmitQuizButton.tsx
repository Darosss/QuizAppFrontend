import {useEffect} from "react";
import {Alert} from "react-native";
import {
  QuizSubmissionScoreResponseType,
  quizesEndpointsUrls,
  useApi,
} from "src/api";
import {useQuizContentContext} from "./QuizContentContext";
import {calculatePercentage} from "src/helpers";
import {CustomButton} from "../common";

type SubmitQuizButtonProps = {
  quizId: string;
};

export const SubmitQuizButton = ({quizId}: SubmitQuizButtonProps) => {
  const {
    answeredQuestionsState: [answeredQuestions],
  } = useQuizContentContext();

  const {
    apiData: {data, ApiError, Loading},
    refetchData,
  } = useApi<QuizSubmissionScoreResponseType>(
    {
      url: quizesEndpointsUrls.submissionsSubmit(quizId),
      method: "PUT",
      body: {answeredQuestions: [...answeredQuestions]},
    },
    {manual: true},
  );

  useEffect(() => {
    if (!data) return;

    ResultInfoAlert({data});
  }, [data]);

  if (ApiError) return <ApiError />;

  return (
    <>
      <CustomButton
        title="Submit"
        onPress={() => {
          ConfirmSubmitAlert({
            onOk: refetchData,
          });
        }}
      />
      {Loading ? <Loading /> : null}
    </>
  );
};

type ConfirmSubmitAlertProps = {
  onOk: () => void;
  onCancel?: () => void;
};

const ConfirmSubmitAlert = ({onCancel, onOk}: ConfirmSubmitAlertProps) => {
  return Alert.alert("Are you sure?", "You can't undo this", [
    {
      text: "Cancel",
      onPress: onCancel,
      style: "cancel",
    },
    {text: "OK", onPress: onOk},
  ]);
};

type ResultInfoAlertProps = {
  data: QuizSubmissionScoreResponseType;
};

const ResultInfoAlert = ({
  data: {correctAnswers, totalAnswers},
}: ResultInfoAlertProps) => {
  return Alert.alert(
    "Score",
    `Your score: ${correctAnswers}/${totalAnswers} (${calculatePercentage(
      correctAnswers,
      totalAnswers,
    )})`,
  );
};
