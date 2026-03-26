import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

    return { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL, token };
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

    return { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL, token };
  } catch (error) {
    console.error('Google Sign-In error:', error.message);
    localStorage.removeItem('token'); // Clear potentially stale token
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

// Helper: convert a file to a compressed Base64 data URL
const fileToBase64 = (file, maxWidth = 200) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Compress by drawing to a canvas
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // JPEG at 70% quality
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Update user profile function (stores photo as Base64)
export const updateUserMetadata = async ({ displayName, photoFile }) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");

    let photoURL = null;

    if (photoFile) {
      // Convert image to a compressed Base64 data URL
      photoURL = await fileToBase64(photoFile);
    }

    // 1. Save to localStorage FIRST (always works, instant)
    if (displayName) localStorage.setItem('userName', displayName);
    if (photoURL) localStorage.setItem('photoURL', photoURL);

    // 2. Update Firebase Auth displayName (best effort)
    if (displayName) {
      try {
        await updateProfile(user, { displayName });
      } catch (e) {
        console.warn('Auth profile update failed (non-critical):', e.message);
      }
    }

    // 3. Try saving to Firestore `users` collection (best effort, non-blocking)
    try {
      const userDocRef = doc(db, "users", user.uid);
      const firestoreData = { 
        email: user.email,
        updatedAt: new Date().toISOString()
      };
      if (displayName) firestoreData.displayName = displayName;
      if (photoURL) firestoreData.photoURL = photoURL;
      await setDoc(userDocRef, firestoreData, { merge: true });
    } catch (e) {
      console.warn('Firestore profile save failed (photo saved locally):', e.message);
      // Photo is already in localStorage, so UI still works
    }

    return {
      displayName: displayName || user.displayName,
      photoURL: photoURL || localStorage.getItem('photoURL') || user.photoURL
    };
  } catch (error) {
    console.error('Update profile error:', error.message);
    throw new Error(error.message || 'Failed to update profile');
  }
};

// Load user profile from Firestore (call on login to restore photo)
export const loadUserProfile = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.photoURL) localStorage.setItem('photoURL', data.photoURL);
      if (data.displayName) localStorage.setItem('userName', data.displayName);
      return data;
    }
    return null;
  } catch (error) {
    console.warn('Failed to load user profile:', error.message);
    return null;
  }
};
