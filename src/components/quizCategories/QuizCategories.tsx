import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Props} from "src/types";
import {QuizCategoriesList} from "./QuizCategoriesList";
import {QuizCategoriesData} from "./QuizCategoriesData";
import {styles} from "./styles";

export const QuizCategories = ({
  navigation,
  route,
}: Props<"QuizCategories">) => {
  return (
    <QuizCategoriesList
      ListHeaderComponent={ListHeaderComponent}
      renderItemChildren={data => <QuizCategoriesData data={data} />}
    />
  );
};

const ListHeaderComponent = () => {
  return (
    <View style={styles.dataHeader}>
      <Text>Name</Text>
      <Text>Created</Text>
    </View>
  );
};
