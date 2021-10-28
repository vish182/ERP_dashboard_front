import React, { useContext, useState, useEffect } from "react";
import { auth } from "../auth/firebase_auth";
import { createUser, getUserData } from "../auth/firestore_auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [currentUserDoc, setCurrentUserDoc] = useState({}); // custom

  function signup({ email, password }) {
    createUser({ UID: email }); // custom function
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function login({ email, password }) {
    let userData = await getUserData(email);
    setCurrentUserDoc(userData);
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setCurrentUserDoc(undefined);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUserDoc,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
