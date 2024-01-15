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

export type GetAuthStatusType = {
  authenticated: boolean;
  user: {sub: string; username: string; roles: UserRolesType};
};

export enum UserRolesType {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}
