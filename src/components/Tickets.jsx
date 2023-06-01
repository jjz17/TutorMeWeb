import { doc, onSnapshot, collection, getFirestore, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // useEffect depends on change in currentUser.uid
  // useEffect(() => {
  //   const getTickets = () => {
  //     // Retrieves current user's userChats each time it is updated
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setTickets(doc.data());
  //       console.log("User's chats updated");
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getTickets();
  // }, [currentUser.uid]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'tickets'));
        const ticketList = snapshot.docs.map(doc => ({
          id: doc.id,
          description: doc.data().description,
          date: doc.data().date,
          img: doc.data().img
        }));
        setTickets(ticketList);
        console.log(ticketList[0].description)
        console.log(ticketList[0].id)
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);


  const handleSelect = (u) => {
    console.log("Chats handleSelect userInfo");
    console.log(u);
    // dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {/* {tickets &&
        Object.entries(tickets)
          ?.sort((a, b) => b.date - a.date)
          .map((ticket) => (
            <div
              className="user-chat"
              key={ticket.id}
            onClick={() => handleSelect(ticket[1].userInfo)}
            >
            <p>{ticket.description}</p>

              {ticket[1].userInfo && (
                <img src={ticket[1].userInfo.photoURL} alt="" />
              )}
              <div className="user-chat-info">
                <span>{ticket[1].userInfo.displayName}</span>
                <p>{ticket[1].lastMessage?.text}</p>
              </div>
            </div>
          ))} */}


      {tickets &&
        tickets
          .sort((a, b) => b.date - a.date)
          .map((ticket) => (
            <div className="user-chat" 
            key={ticket.id} 
            onClick={() => handleSelect(ticket)}>
              {/* Render ticket content here */}
              <p>{ticket.description}</p>
            </div>
          ))}
    </div>
  );
};

export default Tickets;
