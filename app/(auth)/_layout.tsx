// DEPENDENCIES
import { Stack } from "expo-router";
import { Platform } from "react-native";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="username"
        options={{
          headerTitle: "FISU 2024",
          animation: Platform.OS == "android" ? "fade_from_bottom" : "default",
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: "FISU 2024 - Sign In",
          animation: Platform.OS == "android" ? "fade_from_bottom" : "default",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "FISU 2024 - Sign Up",
          animation: Platform.OS == "android" ? "fade_from_bottom" : "default",
        }}
      />
      <Stack.Screen
        name="forgotpassword"
        options={{
          headerTitle: "Forgot Password",
          headerBackTitle: "Back",
          animation: Platform.OS == "android" ? "fade_from_bottom" : "default",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
