import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomAuthProvider, useAuth } from "@/providers/CustomAuthProvider";
import { StatusBar } from "react-native";
const queryClient = new QueryClient();

export default function AppLayout() {
  return (
    <CustomAuthProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <StatusBar barStyle={"dark-content"} />
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(root)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </CustomAuthProvider>
  );
}
