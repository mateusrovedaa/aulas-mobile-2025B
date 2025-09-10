import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="segunda"
        options={{
          title: "Segunda",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "list" : "list-outline"} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
