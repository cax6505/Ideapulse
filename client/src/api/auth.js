import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Firebase signup function
export const signup = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's profile to include the display name
    await updateProfile(user, { displayName: name });

    const token = await user.getIdToken();
    if (token) {
      localStorage.setItem('token', token);
    }

    return { uid: user.uid, email: user.email, displayName: user.displayName, token };
  } catch (error) {
    console.error('Signup error:', error.message);
    localStorage.removeItem('token'); // Clear potentially stale token
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
    localStorage.removeItem('token'); // Clear potentially stale token
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
    localStorage.removeItem('token'); // Clear potentially stale token
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};
