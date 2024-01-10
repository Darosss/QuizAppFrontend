import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";

import {RootStackParamList} from "./types";
import {HomeScreen} from "./components/home";
import {ProfileScreen} from "./components/profile";
import {QuizCategories} from "./components/quizCategories";
import {LoginScreen} from "./components/auth";
import {useGetTheme} from "./hooks";
import {QuizView} from "./components/quizView";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  const theme = useGetTheme();

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="QuizCategories" component={QuizCategories} />
        <RootStack.Screen name="Quizes" component={QuizView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
