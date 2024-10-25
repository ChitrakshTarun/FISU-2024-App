import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="food"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="tourism"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="health"
            options={{
              headerTitle: "Healthcare Information",
            }}
          />
          <Stack.Screen
            name="help"
            options={{
              headerTitle: "Contacts & Help",
            }}
          />
          <Stack.Screen
            name="hosts"
            options={{
              headerTitle: "Event Hosts",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
