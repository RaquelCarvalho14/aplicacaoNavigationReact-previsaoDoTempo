import { createDrawerNavigator } from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";
import Sobre from "../screens/Sobre";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={TabNavigator} options={({ route }) => {
          // Nome da aba ativa dentro do Tab (undefined no primeiro instante)
          const aba = getFocusedRouteNameFromRoute(route);

          return {
            headerTitle: aba === "Favoritos" ? "Favoritos" : "Início",
          };
        }}/>
      <Drawer.Screen name="Sobre" component={Sobre}/>
    </Drawer.Navigator>
  );
}