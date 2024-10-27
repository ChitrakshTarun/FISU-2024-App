import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import InputTextField from "@/components/InputTextField";
import { useAuth } from "@/providers/CustomAuthProvider";

export default function SignInScreen() {
  const { signIn, passportNumber } = useAuth();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn(passportNumber!, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            Welcome back {passportNumber}. Please enter the password you had set for your account to sign in.
          </Text>
          <InputTextField
            subtitle="Password"
            iconName="lock-closed-outline"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
          </TouchableOpacity>
          <Link href="/forgotpassword" style={styles.link}>
            Forgot Password?
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 16,
    width: "100%",
    // alignItems: "center",
  },
  content: {
    padding: 20,
  },
  instructionText: {
    marginBottom: 20,
    color: "#333",
    textAlign: "auto",
    lineHeight: 24,
  },
  passportNumber: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.OceanBlue,
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: Colors.OceanBlue + "80",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
