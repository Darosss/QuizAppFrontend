import {BaseEndpoints} from "./enum";

export const authEndpointsUrls = {
  auth: "auth/",
  login: BaseEndpoints + "login/",
  logout: BaseEndpoints.AUTH + "logout/",
  signup: BaseEndpoints.AUTH + "signup/",
};

export const quizesEndpointsUrls = {
  quizes: BaseEndpoints.QUIZES,
  quizesQuestions: (quizId: string) =>
    BaseEndpoints.QUIZES + `${quizId}/` + BaseEndpoints.QUESTIONS,
  quizesQuestionAnswers: (questionId: string) =>
    BaseEndpoints.QUIZES +
    BaseEndpoints.QUESTIONS +
    `${questionId}/` +
    BaseEndpoints.ANSWERS,
};
