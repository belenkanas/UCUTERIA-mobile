import { Tabs } from "expo-router";
import { ShoppingCart, Home } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Inicio", tabBarIcon: ({ color }) => <Home color={color} /> }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color }) => <ShoppingCart color={color} />,
        }}
      />
    </Tabs>
  );
}
