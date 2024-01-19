import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {UserType, useApi, usersEndpointsUrls} from "src/api";
import {PropsAdminStack} from "src/types";
import {styles} from "./styles";

export const ManageUsers = ({
  navigation,
  route,
}: PropsAdminStack<"ManageUsers">) => {
  const {
    apiData: {data, Loading, ApiError},
    refetchData,
  } = useApi<UserType[]>({url: usersEndpointsUrls.users, method: "GET"});

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;

  return (
    <View style={styles.manageUsersWrapper}>
      <FlatList
        data={data}
        keyExtractor={({_id}) => _id}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.manageUsersDataWrapper}
            onPress={() =>
              navigation.navigate("ManageOneUser", {userId: item._id})
            }>
            <Text style={styles.manageUsersDataText}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ListHeaderComponent = () => {
  return (
    <View>
      <Text>Press user to manage</Text>
    </View>
  );
};
