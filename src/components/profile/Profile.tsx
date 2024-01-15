import {Text, View} from "react-native";
import {type ProfileType, authEndpointsUrls, useApi} from "src/api";
import {Props} from "src/types";
import {styles} from "./styles";

export const ProfileScreen = ({navigation, route}: Props<"Profile">) => {
  const {
    apiData: {data, Loading, ApiError},
  } = useApi<ProfileType>({
    url: authEndpointsUrls.profile,
    method: "GET",
  });

  if (Loading) return <Loading />;
  if (ApiError) return <ApiError />;

  if (!data) return null;

  return (
    <View>
      <View style={styles.profileDataWrapper}>
        <View style={styles.profileData}>
          <Text style={styles.profileDataHeader}>Username </Text>
          <Text style={styles.profileDataText}>{data.username}</Text>
        </View>
        <View style={styles.profileData}>
          <Text style={styles.profileDataHeader}>Roles </Text>
          <Text style={styles.profileDataText}>{data.roles.join(",")}</Text>
        </View>
      </View>
      <Text>
        {"\n"}
        There will be user statistics, completed quizes, achievements or
        something like this
      </Text>
    </View>
  );
};
