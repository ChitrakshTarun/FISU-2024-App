import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Router } from "expo-router";
import { Alert } from "react-native";

export async function checkAuthRoute(
  passportNumber: string,
  router: Router,
  setPassportNumber: (passport: string) => void
): Promise<void> {
  try {
    const userDocRef = doc(db, "players", passportNumber);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      setPassportNumber(passportNumber);
      if (userData?.usrpswd) {
        router.push("/(auth)/signin");
      } else {
        router.push("/(auth)/signup");
      }
    } else {
      Alert.alert(
        "User Not Found",
        "The user with the provided passport number does not exist. Please make sure you're entering your credentials correctly."
      );
    }
  } catch (error) {
    Alert.alert("Error", "An error occured. Make sure you have a stable internet connection.");
  }
}
