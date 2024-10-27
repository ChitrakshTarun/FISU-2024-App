// DEPENDENCIES
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="username"
        options={{
          headerTitle: "Welcome - FISU 2024",
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: "FISU 2024 - Sign In",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "FISU 2024 - Sign Up",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="forgotpassword"
        options={{
          headerTitle: "Forgot Password",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
