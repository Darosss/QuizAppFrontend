import {BaseEndpoints} from "./enum";

export const authEndpointsUrls = {
  auth: "auth/",
  login: BaseEndpoints.AUTH + "login/",
  status: BaseEndpoints.AUTH + "status/",
  logout: BaseEndpoints.AUTH + "logout/",
  signup: BaseEndpoints.AUTH + "signup/",
  profile: BaseEndpoints.AUTH + "profile/",
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
  canStartQuiz: (quizId: string) =>
    BaseEndpoints.QUIZES + `${quizId}/can-start`,

  submissions: BaseEndpoints.QUIZES + BaseEndpoints.SUBMISSIONS,
  submissionsSubmit: (quizId: string) =>
    BaseEndpoints.QUIZES + BaseEndpoints.SUBMISSIONS + `${quizId}/submit`,
};
