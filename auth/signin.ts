import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { router } from "expo-router";
import { hashPassword, setAuthState } from "@/auth/utils";

interface SignInResult {
  success: boolean;
  error?: string;
}

export async function handleSignIn(passportNumber: string, password: string): Promise<SignInResult> {
  try {
    if (!passportNumber || !password) {
      return {
        success: false,
        error: "Please enter both passport number and password",
      };
    }

    const userDocRef = doc(db, "players", passportNumber);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return {
        success: false,
        error: "No user found with this passport number",
      };
    }

    const userData = userDocSnap.data();
    const hashedPassword = await hashPassword(password);

    if (hashedPassword !== userData.usrpswd) {
      return {
        success: false,
        error: "Incorrect password",
      };
    }

    await updateDoc(userDocRef, {
      islogged: true,
    });

    await setAuthState(passportNumber, true);
    router.replace("/(tabs)/home");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      success: false,
      error: "An error occurred during sign in",
    };
  }
}
