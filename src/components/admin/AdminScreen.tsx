import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AdminStackParamList, Props} from "src/types";
import {
  ManageOneQuiz,
  ManageOneQuizQuestion,
  ManageQuizes,
  ManageQuizQuestions,
} from "../manageQuizes";
import {AdminMenu} from "./AdminMenu";
import {ManageUsers} from "../manageUsers";

const AdminStack = createNativeStackNavigator<AdminStackParamList>();
export const AdminScreen = ({navigation, route}: Props<"Admin">) => {
  return (
    <AdminStack.Navigator initialRouteName="AdminMenu">
      <AdminStack.Screen
        name="AdminMenu"
        component={AdminMenu}
        options={{
          headerShown: false,
        }}
      />
      <AdminStack.Screen name="ManageQuizes" component={ManageQuizes} />
      <AdminStack.Screen name="ManageOneQuiz" component={ManageOneQuiz} />
      <AdminStack.Screen
        name="ManageQuizQuestions"
        component={ManageQuizQuestions}
      />
      <AdminStack.Screen
        name="ManageOneQuizQuestion"
        component={ManageOneQuizQuestion}
      />
      <AdminStack.Screen name="ManageUsers" component={ManageUsers} />
    </AdminStack.Navigator>
  );
};
