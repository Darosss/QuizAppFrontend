import {DefaultTheme} from "@react-navigation/native";
import {useColorScheme} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";

export const useGetTheme = () => {
  const isDarkMode = useColorScheme() === "dark";

  const primaryColors = isDarkMode ? Colors.darker : Colors.lighter;
  const opositeColors = isDarkMode ? Colors.lighter : Colors.darker;

  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 45, 85)",
      background: primaryColors,
      card: primaryColors,
      text: opositeColors,
    },
  };
};
