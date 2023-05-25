import React, { useContext, useEffect, useState } from "react";
import SideNav from "../components/Sidenav";
import TicketForm from "../components/TicketForm";
import { AuthContext } from "../context/AuthContext";
import { doc, query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Tickets = () => {

  // const { currentUser } = useContext(AuthContext);
  // const role = currentUser.role;

  // if (role === "student") {
    
  // }

  const [tickets, setTickets] = useState([]);

  // useEffect depends on change in currentUser.uid
  useEffect(() => {
    const getTickets = () => {
      // Retrieves current user's userChats each time it is updated
      const unsub = onSnapshot(doc(db, "tickets", currentUser.uid), (doc) => {
        setTickets(doc.data());
        console.log("User's chats updated");
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getTickets();
  }, [currentUser.uid]);



// const [data, setData] = useState([]);

// useEffect(() => { 
//        const unsubscribe = someFirestoreAPICall().onSnapshot(snap => {
//          const data = snap.docs.map(doc => doc.data())
//          this.setData(data)
//        });

//        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
//        return () => unsubscribe()
// }, []);

  return (
    <div className="tickets">
      <div className="container">
        {/* <SideNav /> */}
        {/* <div className="chat-info">
                    <span>Create Ticket</span>
                </div> */}
        {/* <TicketForm /> */}

      </div>
    </div>
  );
};

export default Tickets;
