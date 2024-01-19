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
  quizById: (quizId: string) => BaseEndpoints.QUIZES + quizId,
  quizesQuestions: (quizId: string) =>
    BaseEndpoints.QUIZES + `${quizId}/` + BaseEndpoints.QUESTIONS,
  questions: BaseEndpoints.QUIZES + BaseEndpoints.QUESTIONS,
  quizQuestionById: (questionId: string) =>
    BaseEndpoints.QUIZES + BaseEndpoints.QUESTIONS + questionId,
  quizesQuestionAnswers: (questionId: string) =>
    BaseEndpoints.QUIZES +
    BaseEndpoints.QUESTIONS +
    `${questionId}/` +
    BaseEndpoints.ANSWERS,
  answers: BaseEndpoints.QUIZES + BaseEndpoints.ANSWERS,
  quizesAnswerById: (answerId: string) =>
    BaseEndpoints.QUIZES + BaseEndpoints.ANSWERS + answerId,
  quizesQuestionAnswersManage: (questionId: string) =>
    BaseEndpoints.QUIZES +
    BaseEndpoints.QUESTIONS +
    `${questionId}/` +
    BaseEndpoints.ANSWERS +
    "manage",
  canStartQuiz: (quizId: string) =>
    BaseEndpoints.QUIZES + `${quizId}/can-start`,

  submissions: BaseEndpoints.QUIZES + BaseEndpoints.SUBMISSIONS,
  submissionsSubmit: (quizId: string) =>
    BaseEndpoints.QUIZES + BaseEndpoints.SUBMISSIONS + `${quizId}/submit`,
};
