import {
  Button,
  FlatList,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import {QuizQuestionType, quizesEndpointsUrls, useApi} from "src/api";
import {PropsAdminStack} from "src/types";
import {styles} from "./styles";
import {
  AddNewQuestionButton,
  RemoveQuestionButton,
} from "./AddRemoveQuestionButtons";

export const ManageQuizQuestions = ({
  navigation,
  route,
}: PropsAdminStack<"ManageQuizQuestions">) => {
  const {
    apiData: {data, Loading, ApiError},
    refetchData,
  } = useApi<QuizQuestionType[]>({
    url: quizesEndpointsUrls.quizesQuestions(route.params.quizId),
    method: "GET",
  });

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;

  if (!data) return null;

  return (
    <View style={styles.manageQuizQuestionsWrapper}>
      <Text style={styles.manageQuizQuestionsText}>
        Manage questions of quiz:
      </Text>
      <Text style={styles.manageQuizQuestionsText}>
        {route.params.quizName}
      </Text>
      <AddNewQuestionButton
        quizId={route.params.quizId}
        onAddNew={refetchData}
      />

      <FlatList
        data={data}
        keyExtractor={({_id}) => _id}
        ListHeaderComponent={<></>}
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.manageQuizQuestionsDataWrapper}>
            <Text
              style={styles.manageQuizQuestionsDataText}
              onPress={() => {
                navigation.navigate("ManageOneQuizQuestion", {
                  questionId: item._id,
                  questionName: item.name,
                });
              }}>
              {index + 1 + ". "} {item.name}
            </Text>
            <RemoveQuestionButton
              questionId={item._id}
              onRemove={refetchData}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
