import { Router } from "expo-router";

export interface AuthState {
  passportNumber: string;
  isLoggedIn: boolean;
}

export interface AuthContextType {
  isLoading: boolean;
  isSignedIn: boolean;
  passportNumber: string | null;
  checkAuthRoute: (passportNumber: string, router: Router) => Promise<void>;
  signIn: (passportNumber: string, password: string) => Promise<void>;
  signUp: (passportNumber: string, password: string, confirmPassword: string) => Promise<void>;
  signOut: () => Promise<void>;
}
