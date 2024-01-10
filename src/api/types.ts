type BaseApiData = {
  id: string;
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
