import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Quizes: {quizId: string; quizName: string};
  QuizCategories: undefined;
};
export type Props<T extends keyof RootStackParamList = "Home"> =
  NativeStackScreenProps<RootStackParamList, T>;
