import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.Black,
        tabBarInactiveTintColor: Colors.Gray,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "FISU 2024 - Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? Colors.Black : Colors.Gray}
            />
          ),
          tabBarLabelStyle: { fontWeight: "bold" },
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          headerTitle: "FISU Event Schedule",
          tabBarLabel: "Schedule",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={focused ? Colors.Black : Colors.Gray}
            />
          ),
          tabBarLabelStyle: { fontWeight: "bold" },
        }}
      />
      <Tabs.Screen
        name="shuttle"
        options={{
          headerTitle: "Shuttle Schedule",
          tabBarLabel: "Shuttle",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "bus" : "bus-outline"} size={size} color={focused ? Colors.Black : Colors.Gray} />
          ),
          tabBarLabelStyle: { fontWeight: "bold" },
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerTitle: "Event Updates",
          tabBarLabel: "Updates",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={focused ? Colors.Black : Colors.Gray}
            />
          ),
          tabBarLabelStyle: { fontWeight: "bold" },
        }}
      />
    </Tabs>
  );
}
