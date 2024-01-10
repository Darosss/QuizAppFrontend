import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {QuizesEndpoints, useApi, type QuizCategoriesType} from "@api/";
import {Props} from "src/types";
import {styles} from "./styles";

export const QuizCategories = ({
  navigation,
  route,
}: Props<"QuizCategories">) => {
  const {
    apiData: {data, Loading, ApiError},
  } = useApi<QuizCategoriesType[]>(QuizesEndpoints.QUIZES_CATEGORIES, "GET");

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={({id}) => id}
        ListHeaderComponent={() => (
          <View style={styles.dataHeader}>
            <Text>Name</Text>
            <Text>Created</Text>
          </View>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.dataItem}
            onPress={() =>
              navigation.navigate("Quizes", {
                quizId: item.id,
                quizName: item.name,
              })
            }>
            <Text>{item.name}</Text>
            <Text>{item.createdAt.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
