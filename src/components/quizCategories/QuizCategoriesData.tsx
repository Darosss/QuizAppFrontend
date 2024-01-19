import {TouchableOpacity, Text} from "react-native";
import {QuizCategoriesType} from "src/api";
import {styles} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {PropsNavigation} from "src/types";

type QuizCategoriesDataProps = {
  data: QuizCategoriesType;
};

export const QuizCategoriesData = ({data}: QuizCategoriesDataProps) => {
  const navigation = useNavigation<PropsNavigation>();
  return (
    <TouchableOpacity
      style={styles.dataItem}
      onPress={() =>
        navigation.navigate("Quizes", {
          quizId: data._id,
          quizName: data.name,
        })
      }>
      <Text>{data.name}</Text>
      <Text>{data.createdAt.toLocaleString()}</Text>
    </TouchableOpacity>
  );
};
