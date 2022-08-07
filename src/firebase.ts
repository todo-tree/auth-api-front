import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import development from "./config";

initializeApp(development.firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
