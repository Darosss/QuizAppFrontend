import React, {useContext, useState} from "react";
import {useLocalStorage} from "src/hooks";

export type QuizContentContextType = {
  autoNextQuestionState: [boolean | null, (data: boolean) => Promise<boolean>];
  currentQuestionState: [number, React.Dispatch<React.SetStateAction<number>>];
  answeredQuestionsState: [
    Map<string, string>,
    React.Dispatch<React.SetStateAction<Map<string, string>>>,
  ];
};

export const QuizContentContext =
  React.createContext<QuizContentContextType | null>(null);

export const QuizContentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [autoNextQuestion, setAutoNextQuestion] = useLocalStorage(
    "autoNextQuestion",
    false,
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Map<string, string>(),
  );

  return (
    <QuizContentContext.Provider
      value={{
        answeredQuestionsState: [answeredQuestions, setAnsweredQuestions],
        currentQuestionState: [currentQuestion, setCurrentQuestion],
        autoNextQuestionState: [autoNextQuestion, setAutoNextQuestion],
      }}>
      {children}
    </QuizContentContext.Provider>
  );
};

export const useQuizContentContext = (): Required<QuizContentContextType> => {
  const quizContentContext = useContext(QuizContentContext);
  if (!QuizContentContext) {
    throw new Error(
      "useQuizContentContext must be used within a QuizContentContextProvider",
    );
  }
  return quizContentContext as QuizContentContextType;
};
