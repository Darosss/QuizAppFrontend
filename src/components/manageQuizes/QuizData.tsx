import {useNavigation} from "@react-navigation/native";
import {QuizCategoriesType} from "src/api";
import {PropsAdminStackNavigation} from "src/types";
import {CustomButton} from "../common";

type QuizDataProps = {
  data: QuizCategoriesType;
};
export const QuizData = ({data}: QuizDataProps) => {
  const navigation = useNavigation<PropsAdminStackNavigation>();
  return (
    <CustomButton
      title={data.name}
      onPress={() => {
        navigation.navigate("ManageOneQuiz", {quizId: data._id});
      }}
    />
  );
};
