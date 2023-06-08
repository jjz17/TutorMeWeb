import {
  doc,
  onSnapshot,
  collection,
  getFirestore,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import _ from "lodash";

const Tickets = () => {
  const [unclaimedTickets, setUnclaimedTickets] = useState([]); // tutors
  const [myTickets, setMyTickets] = useState([]); // students and tutors
  const [myOpenTickets, setMyOpenTickets] = useState([]); // students and tutors
  const [myClosedTickets, setMyClosedTickets] = useState([]); // students and tutors

  const { currentUser, profile } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Fetch open tickets on render
  // TODO: refetch tickets whenever the collection is updated
  useEffect(() => {
    const fetchOpenTickets = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, "tickets"), where("tutorId", "==", null))
        );
        const ticketList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // {
        // id: doc.id,
        // description: doc.data().description,
        // date: doc.data().date,
        // img: doc.data().img
        // }
        setUnclaimedTickets(ticketList);
        console.log(ticketList);
        // console.log(ticketList[0].description)
        // console.log(ticketList[0].id)
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchOpenTickets();
  }, []);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        var idType;
        if (profile.role === "student") {
          idType = "studentId";
        } else {
          idType = "tutorId";
        }
        const snapshot = await getDocs(
          query(collection(db, "tickets"), where(idType, "==", currentUser.uid))
        );
        const ticketList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // {
        // id: doc.id,
        // description: doc.data().description,
        // date: doc.data().date,
        // img: doc.data().img
        // }
        setMyTickets(ticketList);
        console.log(ticketList);
        // console.log(ticketList[0].description)
        // console.log(ticketList[0].id)
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchMyTickets();
  }, [currentUser, profile]);

  useEffect(() => {
    var separatedTickets = _.partition(myTickets, (t) => t.status == "open");

    setMyOpenTickets(separatedTickets[0]);
    setMyClosedTickets(separatedTickets[1]);
  }, myTickets);

  const handleSelect = (t) => {
    console.log("Selected ticket", t);
    if (t.studentId === currentUser.uid) {
      console.log("You opened this ticket!");
    }

    // Send tutor to ticket chat if the ticket is open or if they have claimed the ticket
    if (t.tutorId == null || t.tutorId === currentUser.uid) {
      console.log("This ticket has not been claimed");
      dispatch({ type: "CHANGE_TICKET", payload: t });
    } else {
      console.log("This ticket has been claimed by another tutor");
    }
  };

  return (
    <div className="chats">
      {unclaimedTickets &&
        unclaimedTickets
          .sort((a, b) => b.date - a.date)
          .map((ticket) => (
            <div
              className="user-chat"
              key={ticket.id}
              onClick={() => handleSelect(ticket)}
            >
              {/* Render ticket content here */}
              <p>{ticket.description}</p>
            </div>
          ))}
    </div>
  );
};

export default Tickets;
