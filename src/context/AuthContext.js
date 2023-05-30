import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, query, collection, where, onSnapshot, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [profile, setProfile] = useState(null);

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
      if (currentUser) {
        // const webUserRef = collection('webUsers').doc(currentUser.uid);
        // unsub = webUserRef.onSnapshot((doc) => {
        //     if (doc.exists) {
        //         setProfile(doc.data());
        //     } else {
        //         setProfile(null);
        //     }
        // });
        unsub = onSnapshot(doc(db, "webUsers", currentUser.uid), (doc) => {
          console.log("UID:", currentUser.uid)
          setProfile(doc.data());
          console.log("Profile updated");
          {profile &&  console.log(profile.role)}
        });
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
    <AuthContext.Provider value={{ currentUser, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
