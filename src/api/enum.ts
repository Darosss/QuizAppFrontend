export enum BaseEndpoints {
  HOME = "/",
  QUIZES = "quizes/",
  AUTH = "auth/",
}

export enum AuthEndpoints {
  LOGIN = BaseEndpoints.AUTH + "login/",
  LOGOUT = BaseEndpoints.AUTH + "logout/",
  SIGNUP = BaseEndpoints.AUTH + "signup/",
}

export enum QuizesEndpoints {
  QUIZES = BaseEndpoints.QUIZES,
  QUIZES_CATEGORIES = BaseEndpoints.QUIZES + "categories/",
  QUESTION_ANSWERS = BaseEndpoints.QUIZES + "answers/",
}
