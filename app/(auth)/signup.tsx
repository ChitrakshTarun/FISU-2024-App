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
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import InputTextField from "@/components/InputTextField";
import { useAuth } from "@/providers/CustomAuthProvider";

export default function SignUpScreen() {
  const { signUp, passportNumber } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUp(passportNumber!, newPassword, confirmPassword);
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
            Welcome, {passportNumber}. Please create your account with a secure password. You will be using this
            password for logging into this app in the future.
          </Text>
          <InputTextField
            subtitle="New Password"
            iconName="lock-closed-outline"
            placeholder="Create new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            editable={!isLoading}
          />
          <InputTextField
            subtitle="Confirm Password"
            iconName="lock-closed-outline"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 16,
    width: "100%",
    alignItems: "center",
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
