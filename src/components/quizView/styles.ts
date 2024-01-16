import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  quizViewQuizName: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 5,
  },
  quizContentWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quizHeader: {
    minWidth: "100%",
    display: "flex",
    borderBottomWidth: 1,
  },
  quizHeaderName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  quizHeaderCurrentQuestion: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  questionTextWrapper: {
    display: "flex",
    alignItems: "center",
  },
  questionText: {
    fontSize: 25,
  },
  answersWrapper: {
    padding: 2,
  },
  answerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    minWidth: "100%",
  },
  answerText: {
    fontSize: 15,
  },
});
