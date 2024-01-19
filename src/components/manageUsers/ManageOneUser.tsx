import {Text, TextInput, View} from "react-native";
import {UserType, useApi, usersEndpointsUrls} from "src/api";
import {PropsAdminStack} from "src/types";
import {styles} from "./styles";
import {useEffect, useState} from "react";
import {CustomButton} from "../common";

export const ManageOneUser = ({
  navigation,
  route,
}: PropsAdminStack<"ManageOneUser">) => {
  const {
    apiData: {data, Loading, ApiError},
    refetchData,
  } = useApi<UserType>({
    url: usersEndpointsUrls.userById(route.params.userId),
    method: "GET",
  });

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;
  if (!data) return null;

  return (
    <View style={styles.manageOneUserWrapper}>
      <Text style={styles.manageOneUserText}>{data.username}</Text>

      <EditOneUser
        userId={route.params.userId}
        userName={data.username}
        onEdit={refetchData}
      />
    </View>
  );
};

type EditOneUserProps = {
  userId: string;
  userName: string;
  onEdit: () => void;
};

const EditOneUser = ({userId, userName, onEdit}: EditOneUserProps) => {
  const [name, setName] = useState(userName);
  const [isEditing, setIsEditing] = useState(false);

  const {
    apiData: {data, ApiError},
    refetchData,
  } = useApi<UserType>(
    {
      url: usersEndpointsUrls.userById(userId),
      method: "PATCH",
      body: {username: name},
    },
    {manual: true},
  );
  if (ApiError) return <ApiError />;

  const handleOnSave = () => {
    refetchData().then(() => setIsEditing(false));
  };

  useEffect(() => {
    data ? onEdit() : null;
  }, [data]);

  return (
    <View>
      {!isEditing ? (
        <CustomButton title="Edit" onPress={() => setIsEditing(true)} />
      ) : (
        <>
          <View>
            <Text>Username</Text>
            <TextInput
              placeholder="Username"
              value={name}
              onChangeText={setName}
            />
          </View>
          <CustomButton title="Cancel" onPress={() => setIsEditing(false)} />
          <CustomButton title="Save" onPress={handleOnSave} />
        </>
      )}
    </View>
  );
};
