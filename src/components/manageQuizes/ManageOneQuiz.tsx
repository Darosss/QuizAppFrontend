import {useEffect, useState} from "react";
import {Text, TextInput, View} from "react-native";
import {QuizCategoriesType, quizesEndpointsUrls, useApi} from "src/api";
import {PropsAdminStack} from "src/types";
import {styles} from "./styles";
import {CustomButton} from "../common";

export const ManageOneQuiz = ({
  navigation,
  route,
}: PropsAdminStack<"ManageOneQuiz">) => {
  const {
    apiData: {data, ApiError, Loading},
    refetchData,
  } = useApi<QuizCategoriesType>({
    url: quizesEndpointsUrls.quizById(route.params.quizId),
    method: "GET",
  });

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;
  if (!data) return null;

  return (
    <View>
      <EditQuizDetails
        quizId={route.params.quizId}
        quizName={data.name}
        onCancel={refetchData}
      />
      <CustomButton
        title="Manage questions"
        onPress={() =>
          navigation.navigate("ManageQuizQuestions", {
            quizName: data.name,
            quizId: route.params.quizId,
          })
        }
      />
    </View>
  );
};

type EditQuizDetailsProps = {
  quizId: string;
  quizName: string;
  onCancel: () => void;
};

const EditQuizDetails = ({
  quizId,
  quizName,
  onCancel,
}: EditQuizDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(quizName);

  const {
    apiData: {data, ApiError},
    refetchData,
  } = useApi<QuizCategoriesType>(
    {
      url: quizesEndpointsUrls.quizById(quizId),
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
    <View style={styles.manageOneQuizWrapper}>
      {!isEditing ? (
        <>
          <Text>{name}</Text>
          <CustomButton title="Edit" onPress={() => setIsEditing(!isEditing)} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Quiz name"
            value={name}
            onChangeText={setName}
          />
          <CustomButton
            bgColor={"red"}
            title="Cancel"
            onPress={handleOnCancelEdit}
          />
          <CustomButton title="Save" onPress={handleOnSave} />
        </>
      )}
    </View>
  );
};
