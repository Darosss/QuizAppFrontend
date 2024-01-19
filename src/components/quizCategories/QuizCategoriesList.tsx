import {View, FlatList, VirtualizedListProps} from "react-native";
import {useApi, QuizCategoriesType, quizesEndpointsUrls} from "src/api";
import React from "react";

type QuizCategoriesListProps = {
  renderItemChildren: (data: QuizCategoriesType) => React.ReactNode;
  ListHeaderComponent: VirtualizedListProps<
    QuizCategoriesType[]
  >["ListHeaderComponent"];
};

export const QuizCategoriesList = ({
  ListHeaderComponent,
  renderItemChildren,
}: QuizCategoriesListProps) => {
  const {
    apiData: {data, Loading, ApiError},
  } = useApi<QuizCategoriesType[]>({
    url: quizesEndpointsUrls.quizes,
    method: "GET",
  });

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={({_id}) => _id}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({item}) => <>{renderItemChildren(item)}</>}
      />
    </View>
  );
};
