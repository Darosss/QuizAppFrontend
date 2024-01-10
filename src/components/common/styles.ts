import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  errorDisplayWrapper: {
    padding: 5,
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
  },
  errorTextInformation: {
    fontSize: 20,
  },
  errorDisplayButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  loadingWrapper: {
    display: "flex",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
  },
  switchNextQuestionWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
