import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  profileDataWrapper: {
    display: "flex",
  },

  profileData: {
    display: "flex",
    fontSize: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileDataHeader: {
    fontSize: 18,
    textDecorationLine: "underline",
    minWidth: "45%",
  },
  profileDataText: {
    fontSize: 18,
    minWidth: "45%",
    textAlign: "right",
  },
});
