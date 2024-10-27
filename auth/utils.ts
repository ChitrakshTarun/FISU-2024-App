import * as SecureStore from "expo-secure-store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import * as Crypto from "expo-crypto";
import { AuthState } from "@/auth/types";

const AUTH_KEY = "authState";

export const setAuthState = async (passportNumber: string | null, isLoggedIn: boolean): Promise<void> => {
  try {
    if (isLoggedIn && passportNumber) {
      await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify({ passportNumber, isLoggedIn }));
    } else {
      await SecureStore.deleteItemAsync(AUTH_KEY);
    }
  } catch (error) {
    console.error("Error setting auth state:", error);
  }
};

export const getAuthState = async (): Promise<AuthState | null> => {
  try {
    const authState = await SecureStore.getItemAsync(AUTH_KEY);
    return authState ? JSON.parse(authState) : null;
  } catch (error) {
    console.error("Error getting auth state:", error);
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password, {
    encoding: Crypto.CryptoEncoding.HEX,
  });
};

export const checkAuthState = async (): Promise<AuthState | null> => {
  const authState = await getAuthState();
  if (authState?.isLoggedIn) {
    const userDocRef = doc(db, "players", authState.passportNumber);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists() && userDocSnap.data().islogged) {
      return authState;
    } else {
      await setAuthState(null, false);
      return null;
    }
  }
  return null;
};
