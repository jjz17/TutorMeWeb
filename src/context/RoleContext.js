import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, query, collection, where, onSnapshot } from "firebase/firestore";

export const RoleContext = createContext();

export const RoleContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [profile, setProfile] = useState(null);
    // console.log(currentUser, profile)
    // const [role, setRole] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          console.log("ROLE Auth state changed", user);
    
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
                    setProfile(doc.data());
                    console.log("Profile updated");
                    console.log(profile)
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
        // <RoleContext.Provider value={{ currentUser, profile }}>
        <RoleContext.Provider value={{ currentUser }}>
            {children}
        </RoleContext.Provider>
    );
};