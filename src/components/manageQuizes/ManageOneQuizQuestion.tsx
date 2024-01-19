import React, {useEffect, useState} from "react";
import {View, Text, Button, TextInput} from "react-native";
import {useApi, quizesEndpointsUrls, QuizQuestionType} from "src/api";
import {PropsAdminStack} from "src/types";
import {EditQuestionAnswers} from "./EditQuestionAnswers";
import {styles} from "./styles";

export const ManageOneQuizQuestion = ({
  navigation,
  route,
}: PropsAdminStack<"ManageOneQuizQuestion">) => {
  const {
    apiData: {data, ApiError, Loading},
    refetchData,
  } = useApi<QuizQuestionType>({
    url: quizesEndpointsUrls.quizQuestionById(route.params.questionId),
    method: "GET",
  });

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;
  if (!data) return null;

  return (
    <View>
      <EditQuestion
        questionId={route.params.questionId}
        questionName={data.name}
        onCancel={refetchData}
      />

      <EditQuestionAnswers questionId={route.params.questionId} />
    </View>
  );
};

type EditQuestionProps = {
  questionId: string;
  questionName: string;
  onCancel: () => void;
};

const EditQuestion = ({
  questionId,
  questionName,
  onCancel,
}: EditQuestionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(questionName);

  const {
    apiData: {data, ApiError},
    refetchData,
  } = useApi<QuizQuestionType>(
    {
      url: quizesEndpointsUrls.quizQuestionById(questionId),
      method: "PATCH",
      body: {name},
    },
    {manual: true},
  );

  useEffect(() => {
    if (data) setName(data.name);
  }, [data]);

  if (ApiError) return <ApiError />;

  const handleOnCancelEdit = () => {
    onCancel();
    setIsEditing(false);
  };

  const handleOnSave = () => {
    refetchData().then(() => {
      setIsEditing(false);
    });
  };

  return (
    <View>
      {!isEditing ? (
        <>
          <Text style={styles.editQuestionText}>{name}</Text>
          <Button title="Edit" onPress={() => setIsEditing(!isEditing)} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Quiz name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Cancel" onPress={handleOnCancelEdit} />
          <Button title="Save" onPress={handleOnSave} />
        </>
      )}
    </View>
  );
};
