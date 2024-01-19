import {useNavigation} from "@react-navigation/native";
import {Button, Text} from "react-native";
import {QuizCategoriesType} from "src/api";
import {PropsAdminStackNavigation, PropsNavigation} from "src/types";

type QuizDataProps = {
  data: QuizCategoriesType;
};
export const QuizData = ({data}: QuizDataProps) => {
  const navigation = useNavigation<PropsAdminStackNavigation>();
  return (
    <Button
      title={data.name}
      onPress={() => {
        navigation.navigate("ManageOneQuiz", {
          quizId: data._id,
          quizName: data.name,
        });
      }}
    />
  );
};
