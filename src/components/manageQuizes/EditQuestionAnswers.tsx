import React, {useState, useEffect} from "react";
import {View, FlatList, Text, TextInput, Switch} from "react-native";
import {
  QuizAnswerType,
  useApi,
  quizesEndpointsUrls,
  QuizAnswersListManageType,
} from "src/api";
import {styles} from "./styles";
import {AddAnswersToQuestionButton} from "./AddAnswersToQuestionButton";
import {CustomButton} from "../common";

type EditQuestionAnswersProps = {
  questionId: string;
};
export const EditQuestionAnswers = ({questionId}: EditQuestionAnswersProps) => {
  const [answers, setAnswers] = useState<
    Omit<QuizAnswerType<QuizAnswersListManageType>["answers"], "id">
  >([]);

  const {
    apiData: {data, Loading, ApiError},
    refetchData,
  } = useApi<QuizAnswerType<QuizAnswersListManageType>>({
    url: quizesEndpointsUrls.quizesQuestionAnswersManage(questionId),
    method: "GET",
  });

  const {
    apiData: {data: patchData, ApiError: PatchError},
    refetchData: updateAnswer,
  } = useApi<QuizAnswerType<QuizAnswersListManageType>>(
    {
      url: quizesEndpointsUrls.quizesAnswerById(data?._id || ""),
      method: "PATCH",
      body: {answers},
    },
    {manual: true},
  );

  useEffect(() => {
    data ? setAnswers(data.answers) : null;
  }, [data]);

  useEffect(() => {
    if (patchData) setAnswers(patchData.answers);
  }, [patchData]);

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;
  if (PatchError) return <PatchError />;
  if (!data)
    return (
      <AddAnswersToQuestionButton questionId={questionId} onAdd={refetchData} />
    );

  const handleOnAddMoreAnswers = () => {
    setAnswers(prevState => [
      ...prevState,
      {
        id: String(prevState.length),
        name: "New added",
        isCorrect: false,
      },
    ]);
  };

  const handleOnSave = async () => {
    await updateAnswer();
  };

  return (
    <View>
      <FlatList
        data={answers}
        keyExtractor={({id}) => id}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={
          <ListFooterComponent
            onAddMoreAnswers={handleOnAddMoreAnswers}
            onSave={handleOnSave}
          />
        }
        renderItem={({item, index}) => (
          <EditQuestionAnswerData
            data={item}
            index={index}
            onPressX={() =>
              setAnswers(prevState => {
                prevState.splice(index, 1);
                return [...prevState];
              })
            }
            onChangeName={value =>
              setAnswers(prevState => {
                prevState[index].name = value;
                return [...prevState];
              })
            }
            onChangeIsCorrect={() =>
              setAnswers(prevState => {
                prevState[index].isCorrect = !prevState[index].isCorrect;
                return [...prevState];
              })
            }
          />
        )}
      />
    </View>
  );
};

type EditQuestionAnswerDataProps = {
  data: QuizAnswersListManageType;
  onPressX: () => void;
  onChangeName: (value: string) => void;
  onChangeIsCorrect: () => void;
  index: number;
};

const EditQuestionAnswerData = ({
  data,
  index,
  onPressX,
  onChangeIsCorrect,
  onChangeName,
}: EditQuestionAnswerDataProps) => {
  return (
    <View style={styles.editQuestionAnswerData}>
      <View style={styles.editQuestionAnswerNrDelete}>
        <Text>
          {index + 1 + ". "} {data.isCorrect}
        </Text>
        <CustomButton bgColor={"red"} title="X" onPress={onPressX} />
      </View>
      <TextInput
        placeholder="Name"
        value={data.name}
        onChangeText={value => onChangeName(value)}
      />
      <Switch value={data.isCorrect} onValueChange={onChangeIsCorrect} />
    </View>
  );
};

const ListHeaderComponent = () => {
  return (
    <View style={styles.editQuestionAnswerData}>
      <Text>Nr.</Text>
      <Text>Answer value</Text>
      <Text>Is correct</Text>
    </View>
  );
};

type ListFooterComponentProps = {
  onAddMoreAnswers: () => void;
  onSave: () => void;
};

const ListFooterComponent = ({
  onAddMoreAnswers,
  onSave,
}: ListFooterComponentProps) => {
  return (
    <View>
      <CustomButton title="Add more answers" onPress={onAddMoreAnswers} />
      <CustomButton title="Save" onPress={onSave} />
    </View>
  );
};
