import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import DetailPage from "../../pages/DetailPage";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailPage}
        options={{
          headerTintColor: "black",
          headerTitle: "Detail Screen",
          headerStyle: {
            backgroundColor: "#00a8a8",
          },
        }}
      />
    </Stack.Navigator>
  );
}
