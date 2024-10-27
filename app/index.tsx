import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@/providers/CustomAuthProvider";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Index() {
  const { isLoading, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const handleNavigation = async () => {
      if (isLoading) return;
      if (isSignedIn) {
        router.replace("/(root)/(tabs)/home");
      } else {
        router.replace("/(auth)/username");
      }
      await SplashScreen.hideAsync();
    };

    handleNavigation();
  }, [isLoading, isSignedIn, router]);

  return null;
}
