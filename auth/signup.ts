import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { router } from "expo-router";
import { hashPassword, setAuthState } from "@/auth/utils";

interface SignUpResult {
  success: boolean;
  error?: string;
}

export async function handleSignUp(
  passportNumber: string,
  newPassword: string,
  confirmPassword: string
): Promise<SignUpResult> {
  try {
    if (!passportNumber || !newPassword || !confirmPassword) {
      return {
        success: false,
        error: "Please fill in all fields",
      };
    }

    const userDocRef = doc(db, "players", passportNumber);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.islogged) {
        return {
          success: false,
          error: "User is already logged in",
        };
      }
    }

    const hashedPassword = await hashPassword(newPassword);

    await setDoc(
      userDocRef,
      {
        usrpswd: hashedPassword,
        islogged: true,
        haspasp: true,
      },
      { merge: true }
    );

    await setAuthState(passportNumber, true);
    router.replace("/(tabs)/home");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error during sign up:", error);
    return {
      success: false,
      error: "An error occurred during sign up",
    };
  }
}
