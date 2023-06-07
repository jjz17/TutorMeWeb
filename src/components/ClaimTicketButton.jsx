import React, { useContext, useEffect, useState } from "react";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const ClaimTicketButton = () => {
    const { currentUser, profile } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleButtonClick = async () => {
        if (profile.role !== "tutor") {
            console.log("Can't claim ticket if you are not a tutor");
        } else {
            try {
                const docRef = doc(db, "tickets", data.ticketId); // Replace with your collection and document ID
                await updateDoc(docRef, { tutorId: currentUser.uid }); // Replace fieldToUpdate with the field you want to update

                console.log("Ticket claimed successfully");
            } catch (error) {
                console.error('Error claiming ticket:', error);
            }
        }
    };

    return (
        <button onClick={handleButtonClick}>Claim Ticket</button>
    );
};

export default ClaimTicketButton;
