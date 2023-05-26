import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, query, collection, where, onSnapshot } from "firebase/firestore";

export const RoleContext = createContext();

export const RoleContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [profile, setProfile] = useState(null);
    // const [role, setRole] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            // console.log("Auth state changed", user);
        });

        return () => {
            unsub();
        };
    }, []);

    useEffect(() => {
        let unsub;

        const fetchWebUser = async () => {
            if (currentUser) {
                const webUserRef = collection('webUsers').doc(currentUser.uid);
                unsub = webUserRef.onSnapshot((doc) => {
                    if (doc.exists) {
                        setProfile(doc.data());
                    } else {
                        setProfile(null);
                    }
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
        <RoleContext.Provider value={{ currentUser, profile }}>
            {children}
        </RoleContext.Provider>
    );
};
