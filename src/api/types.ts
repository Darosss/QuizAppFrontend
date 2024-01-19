import {UserRolesType} from "./enum";

type BaseApiData = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type QuizCategoriesType = BaseApiData & {
  name: string;
};

export type QuizQuestionType = BaseApiData & {
  quizId: string;
  name: string;
};

export type QuizAnswersListType = {
  name: string;
  id: string;
};

export type QuizAnswersListManageType = {
  name: string;
  isCorrect: boolean;
  id: string;
};

export type QuizAnswerType<AnswersType = QuizAnswersListType> = BaseApiData & {
  questionId: string;
  answers: AnswersType[];
  name: string;
};

export type ApiResponseDataError = {
  error: string;
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
};

export type GetApiErrorDataReturnType = {
  message: string;
  statusCode: number;
};

export type ProfileType = {
  sub: string;
  username: string;
  roles: UserRolesType[];
};

export type GetAuthStatusType = {
  authenticated: boolean;
  user: ProfileType;
};

export type LoginApiCallResponseType = {
  accessToken: string;
};

export type QuizCanStartResponseType = {
  canStart: boolean;
  remainingTimeMS?: number;
};

export type QuizSubmissionScoreResponseType = {
  completedAt: string;
  correctAnswers: number;
  totalAnswers: number;
};

export type UserType = BaseApiData & {
  roles: UserRolesType[];
  username: string;
};
