import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/CustomAuthProvider";
import { Colors } from "@/constants/Colors";

export default function ProfileScreen() {
  const { signOut, passportNumber } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.passportNumber}>Passport Number: {passportNumber}</Text>

          <TouchableOpacity
            style={[styles.signOutButton, isSigningOut && styles.buttonDisabled]}
            onPress={signOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? <ActivityIndicator color="#fff" /> : <Text style={styles.signOutButtonText}>Sign Out</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    padding: 20,
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
