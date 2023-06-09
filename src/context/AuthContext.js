import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  query,
  collection,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("Auth state changed", user);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    let unsub;

    const fetchWebUser = async () => {
      if (currentUser && currentUser.uid) {
        unsub = onSnapshot(doc(db, "webUsers", currentUser.uid), (doc) => {
          setProfile(doc.data());
          console.log("Profile updated");
          setLoading(false);
        });
      } else {
        console.log("profile: ", profile);
        console.log("currentUser not set yet");
        setProfile(null);
      }
    };

    fetchWebUser();

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, profile, loaded: loading }}>
      {children}
    </AuthContext.Provider>
  );
};
