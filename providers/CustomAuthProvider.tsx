import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { AuthContextType } from "@/auth/types";
import { checkAuthRoute } from "@/auth/authRoute";
import { getAuthState, setAuthState } from "@/auth/utils";
import { handleSignIn } from "@/auth/signin";
import { handleSignUp } from "@/auth/signup";
import * as SplashScreen from "expo-splash-screen";

const AuthContext = createContext<AuthContextType | null>(null);

const formatPassportNumber = (passport: string): string => {
  return passport.trim().toUpperCase();
};

function useProtectedRoute(isSignedIn: boolean, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkRoute = async () => {
      const inAuthGroup = segments[0] === "(auth)";

      if (!isLoading) {
        if (!isSignedIn && !inAuthGroup) {
          router.replace("/(auth)/username");
        } else if (isSignedIn && inAuthGroup) {
          router.replace("/(root)/(tabs)/home");
        }
      }
    };

    checkRoute();
  }, [isSignedIn, segments, isLoading]);
}

export function CustomAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [passportNumber, setPassportNumber] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  useProtectedRoute(isSignedIn, isLoading);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      const authState = await getAuthState();
      if (authState?.isLoggedIn && authState?.passportNumber) {
        setPassportNumber(authState.passportNumber);
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
      SplashScreen.hideAsync();
      if (!isLoading) {
        if (isSignedIn) {
          router.replace("/(root)/(tabs)/home");
        } else {
          router.replace("/(auth)/username");
        }
      }
      await SplashScreen.hideAsync();
    }
  };

  const handleAuthRoute = async (passportNumber: string) => {
    await checkAuthRoute(passportNumber, router, setPassportNumber);
  };

  const signIn = async (rawPassportNumber: string, password: string) => {
    const formattedPassport = formatPassportNumber(rawPassportNumber);
    const result = await handleSignIn(formattedPassport, password);

    if (result.success) {
      setPassportNumber(formattedPassport);
      setIsSignedIn(true);
    } else if (result.error) {
      Alert.alert("Error", result.error);
    }
  };

  const signUp = async (rawPassportNumber: string, password: string, confirmPassword: string) => {
    const formattedPassport = formatPassportNumber(rawPassportNumber);
    const result = await handleSignUp(formattedPassport, password, confirmPassword);

    if (result.success) {
      setPassportNumber(formattedPassport);
      setIsSignedIn(true);
    } else if (result.error) {
      Alert.alert("Error", result.error);
    }
  };

  const signOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        onPress: async () => {
          try {
            if (passportNumber) {
              const userDocRef = doc(db, "players", passportNumber);
              await updateDoc(userDocRef, { islogged: false });
            }
            await setAuthState(null, false);
            setPassportNumber(null);
            setIsSignedIn(false);
            router.replace("/(auth)/username");
          } catch (error) {
            Alert.alert("Error", "An error occurred while signing out. Please try again.");
          }
        },
      },
    ]);
  };

  const value: AuthContextType = {
    isLoading,
    isSignedIn,
    passportNumber,
    checkAuthRoute: handleAuthRoute,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
