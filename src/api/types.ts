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

export type QuizAnswerType = BaseApiData & {
  questionId: string;
  answers: {name: string; isCorrect: boolean; id: string}[];
  name: string;
  isCorrect: boolean;
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
