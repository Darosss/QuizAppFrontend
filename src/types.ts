import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Feed: {sort: "latest" | "top"} | undefined;
  Quizes: undefined;
  QuizCategories: undefined;
};
export type Props<T extends keyof RootStackParamList = "Home"> =
  NativeStackScreenProps<RootStackParamList, T>;
