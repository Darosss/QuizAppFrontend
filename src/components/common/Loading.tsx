import {ActivityIndicator, Text, View} from "react-native";
import {styles} from "./styles";

type LoadingProps = {
  description?: string;
};

export const Loading = ({description}: LoadingProps) => {
  return (
    <View style={styles.loadingWrapper}>
      {description ? (
        <Text style={styles.loadingText}>{description}</Text>
      ) : null}
      <ActivityIndicator size="large" />
    </View>
  );
};
