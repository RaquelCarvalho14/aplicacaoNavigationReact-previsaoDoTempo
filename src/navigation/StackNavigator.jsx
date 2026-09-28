import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";
import Detalhes from "../screens/Detalhes";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="Detalhes" component={Detalhes} options={{ title: "Detalhes da cidade" }}/>
    </Stack.Navigator>
  );
}