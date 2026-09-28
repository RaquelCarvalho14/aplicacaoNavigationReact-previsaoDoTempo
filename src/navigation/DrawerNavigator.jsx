import { createDrawerNavigator } from "@react-navigation/drawer";

import TabNavigator from "./TabNavigator";
import Sobre from "../screens/Sobre";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={TabNavigator}/>
      <Drawer.Screen name="Sobre" component={Sobre}/>
    </Drawer.Navigator>
  );
}
