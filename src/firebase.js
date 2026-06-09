import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFhR7yUHPNtQddmfVL3IrAiwaCdxgNWvk",
  authDomain: "quiz-app-challange.firebaseapp.com",
  projectId: "quiz-app-challange",
  storageBucket: "quiz-app-challange.firebasestorage.app",
  messagingSenderId: "879906763028",
  appId: "1:879906763028:web:27465d22ba4bbb77271201"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();