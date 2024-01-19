import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Quizes: {quizId: string; quizName: string};
  QuizCategories: undefined;
  Admin: undefined;
  ManageQuizes: undefined;

  ManageUsers: undefined;
};
export type Props<T extends keyof RootStackParamList = "Home"> =
  NativeStackScreenProps<RootStackParamList, T>;

export type PropsNavigation<T extends keyof RootStackParamList = "Home"> =
  Props<T>["navigation"];

export type AdminStackParamList = {
  AdminMenu: undefined;
  ManageQuizes: undefined;
  ManageOneQuiz: {quizId: string};
  ManageQuizQuestions: {quizId: string; quizName: string};
  ManageOneQuizQuestion: {questionId: string; questionName: string};
  ManageUsers: undefined;
};

export type PropsAdminStack<T extends keyof AdminStackParamList = "AdminMenu"> =
  NativeStackScreenProps<AdminStackParamList, T>;

export type PropsAdminStackNavigation<
  T extends keyof AdminStackParamList = "AdminMenu",
> = PropsAdminStack<T>["navigation"];
