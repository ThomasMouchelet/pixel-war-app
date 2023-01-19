import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firestoreDb } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const register = async (data) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: data.username,
    });
    localStorage.setItem("token", user.accessToken);
    localStorage.setItem("uid", user.uid);
    const userData = {
      uid: user.uid,
      email: data.email,
      username: data.username,
      totalScore: 0,
      is_ban: false,
    };
    await setDoc(doc(firestoreDb, "users", user.uid), userData);
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (data) => {
  const auth = getAuth();
  try {
    const signInCredentials = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = signInCredentials.user;
    localStorage.setItem("token", user.accessToken);
    localStorage.setItem("uid", user.uid);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const logout = () => {
  const auth = getAuth();
  localStorage.removeItem("token");
  localStorage.removeItem("uid");
  return auth.signOut();
};

const resetPassword = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email)
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};

export { login, register, logout, resetPassword };
