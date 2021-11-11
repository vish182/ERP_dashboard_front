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

    if (!userData) {
      throw "User does not exist";
    } else if (userData && !userData.activation) {
      throw "You are not activated, ask the administrator to approve you.";
    }

    setCurrentUserDoc(userData);
    // let loginObj = auth.signInWithEmailAndPassword(email, password);

    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // return user;
        return true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
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

  function maintainUser(user) {
    setCurrentUser(user);
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
    maintainUser,
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
