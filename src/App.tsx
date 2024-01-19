import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";

import {RootStackParamList} from "./types";
import {HomeScreen} from "./components/home";
import {ProfileScreen} from "./components/profile";
import {QuizCategories} from "./components/quizCategories";
import {
  AuthContextProvider,
  LoginScreen,
  useAuthContext,
} from "./components/auth";
import {useGetTheme} from "./hooks";
import {QuizView} from "./components/quizView";
import {AdminScreen} from "./components/admin";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  const theme = useGetTheme();

  return (
    <NavigationContainer theme={theme}>
      <AuthContextProvider>
        <NavigationContent />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

const NavigationContent = () => {
  const {
    state: {userToken},
    isAdmin,
  } = useAuthContext();
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen name="Home" component={HomeScreen} />
      {userToken == null ? (
        <RootStack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {isAdmin ? (
            <RootStack.Screen name="Admin" component={AdminScreen} />
          ) : null}
          <RootStack.Screen name="Profile" component={ProfileScreen} />
          <RootStack.Screen name="QuizCategories" component={QuizCategories} />
          <RootStack.Screen name="Quizes" component={QuizView} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default App;
