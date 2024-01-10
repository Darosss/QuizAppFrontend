import {Text, View} from "react-native";

type DataFailInfoProps = {
  description: string;
};

export const DataFailInfo = ({description}: DataFailInfoProps) => {
  return (
    <View>
      <Text>{description}</Text>
    </View>
  );
};
