import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  manageQuizesHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  manageQuizesHeaderText: {
    fontSize: 20,
  },

  manageOneQuizWrapper: {
    display: "flex",
    paddingVertical: 10,
    gap: 10,
    textAlign: "center",
  },

  manageQuizQuestionsWrapper: {
    display: "flex",
    flex: 1,
  },
  manageQuizQuestionsText: {
    fontSize: 18,
    padding: 5,
    paddingHorizontal: 10,
  },
  manageQuizQuestionsDataWrapper: {
    borderBottomWidth: 1,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  manageQuizQuestionsDataText: {
    maxWidth: "80%",
  },

  editQuestionAnswersWrapper: {},

  editQuestionAnswersText: {
    fontSize: 18,
  },

  editQuestionAnswerData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editQuestionAnswerNrDelete: {
    display: "flex",
    flexDirection: "row",
  },
  editQuestionText: {
    fontSize: 18,
  },
});
