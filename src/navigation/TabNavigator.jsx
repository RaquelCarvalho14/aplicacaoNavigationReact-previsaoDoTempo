import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Inicio from "../screens/Index";
import Favoritos from "../screens/Favoritos";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="InicioTabs" component={Inicio}/>
      <Tab.Screen name="Favoritos" component={Favoritos}/>
    </Tab.Navigator>
  );
}
