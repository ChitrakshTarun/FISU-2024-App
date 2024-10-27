// DEPENDENCIES
import { Stack } from "expo-router";
import { Platform } from "react-native";

const InformationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="events"
        options={{
          headerTitle: "Competition Events",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="venues"
        options={{
          headerTitle: "Event Venues",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="hosts"
        options={{
          headerTitle: "Event Hosts",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          headerTitle: "Contacts & Help",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default InformationLayout;
