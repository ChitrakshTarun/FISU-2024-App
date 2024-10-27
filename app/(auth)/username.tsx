import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import InputTextField from "@/components/InputTextField";
import { useAuth } from "@/providers/CustomAuthProvider";

export default function UsernameScreen() {
  const [passportNumber, setPassportNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { checkAuthRoute } = useAuth();

  const handleContinue = async () => {
    if (!passportNumber.trim()) {
      Alert.alert("Error", "Please enter your passport number");
      return;
    }

    setIsLoading(true);
    try {
      await checkAuthRoute(passportNumber.trim().toUpperCase(), router);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
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
            Please enter your passport number to continue. This will be used to identify your participant profile.
          </Text>
          <InputTextField
            subtitle="Passport Number"
            iconName="card-outline"
            placeholder="Enter your passport number"
            value={passportNumber}
            onChangeText={setPassportNumber}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  instructionText: {
    marginBottom: 20,
    color: "#333",
    textAlign: "auto",
    lineHeight: 24,
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
});
