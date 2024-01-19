import {Text, View} from "react-native";
import {PropsAdminStack} from "src/types";
import {QuizCategoriesList} from "../quizCategories/QuizCategoriesList";
import {QuizData} from "./QuizData";
import {styles} from "./styles";

export const ManageQuizes = ({
  navigation,
  route,
}: PropsAdminStack<"ManageQuizes">) => {
  return (
    <View>
      <QuizCategoriesList
        ListHeaderComponent={ListHeaderComponent}
        renderItemChildren={data => <QuizData data={data} />}
      />
    </View>
  );
};

const ListHeaderComponent = () => {
  return (
    <View style={styles.manageQuizesHeader}>
      <Text style={styles.manageQuizesHeaderText}>
        Click on name to navigate
      </Text>
    </View>
  );
};
