import {Props} from "src/types";
import {QuizContentContextProvider} from "./QuizContentContext";
import {QuizContent} from "./QuizContent";
import {QuizCanStartResponseType, quizesEndpointsUrls, useApi} from "src/api";
import {useEffect, useRef, useState} from "react";
import {Text} from "react-native";
import {formatTime} from "src/helpers";
import {styles} from "./styles";
import {CustomButton} from "../common";

export const QuizView = ({navigation, route}: Props<"Quizes">) => {
  const {
    apiData: {data, ApiError, Loading},
    refetchData,
  } = useApi<QuizCanStartResponseType>({
    url: quizesEndpointsUrls.canStartQuiz(route.params.quizId),
    method: "GET",
  });
  const [isStarted, setIsStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!data?.remainingTimeMS) return;
    setRemainingTime(data.remainingTimeMS);

    intervalRef.current = setInterval(() => {
      setRemainingTime(prevState => {
        const nextValue = prevState - 1000;
        return nextValue;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data]);

  useEffect(() => {
    if (remainingTime > 0) return;

    refetchData();
    clearInterval(intervalRef.current);
  }, [remainingTime]);

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;

  if (!data) return null;

  return (
    <QuizContentContextProvider>
      {isStarted ? (
        <QuizContent navigation={navigation} route={route} />
      ) : (
        <>
          <Text style={styles.quizViewQuizName}>{route.params.quizName}</Text>
          <CustomButton
            title={`Start ${
              remainingTime > 0 ? formatTime(remainingTime) : ""
            }`}
            {...(!data.canStart ? {disabled: true} : undefined)}
            onPress={() => setIsStarted(true)}
          />
        </>
      )}
    </QuizContentContextProvider>
  );
};
