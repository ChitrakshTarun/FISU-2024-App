// DEPENDENCIES
import { Stack } from "expo-router";
import { Platform } from "react-native";

const InformationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="food"
        options={{
          headerTitle: "Food",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="tourism"
        options={{
          headerTitle: "Tourism Spots",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="travel"
        options={{
          headerTitle: "Travel Information",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="health"
        options={{
          headerTitle: "Healthcare Information",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default InformationLayout;
