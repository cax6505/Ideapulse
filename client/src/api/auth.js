import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDNFiqP16PtGgbXgDMqqQqXhOVBJo8XSfc",
  authDomain: "blog-d9943.firebaseapp.com",
  projectId: "blog-d9943",
  storageBucket: "blog-d9943.appspot.com",
  messagingSenderId: "387975985856",
  appId: "1:387975985856:web:f0e348476b3c3c08134b25",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firebase signup function
export const signup = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's profile to include the display name
    await updateProfile(user, { displayName: name });

    return { uid: user.uid, email: user.email, displayName: user.displayName };
  } catch (error) {
    console.error('Signup error:', error.message);
    throw new Error(error.message || 'Failed to signup');
  }
};

// Firebase login function
export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();
    if (token) {
      localStorage.setItem('token', token);
    }

    return { uid: user.uid, email: user.email, token };
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error(error.message || 'Failed to login');
  }
};

// Google sign-in function
export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const token = await user.getIdToken();
    if (token) {
      localStorage.setItem('token', token);
    }

    return { uid: user.uid, email: user.email, displayName: user.displayName, token };
  } catch (error) {
    console.error('Google Sign-In error:', error.message);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};
