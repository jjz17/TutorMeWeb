import React, { useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const ClaimTicketButton = () => {
    const { currentUser, profile } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleButtonClick = async () => {
        if (profile.role !== "tutor") {
            console.log("Can't claim ticket if you are not a tutor");
        } else {
            try {
                const docRef = doc(db, "tickets", data.ticketId);
                await updateDoc(docRef, { tutorId: currentUser.uid });
                console.log("Ticket claimed successfully");
            } catch (error) {
                console.error("Error claiming ticket:", error);
            }
        }
    };

    return <button onClick={handleButtonClick}>Claim Ticket</button>;
};

export const DropTicketButton = () => {
    const { currentUser, profile } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleButtonClick = async () => {
        if (profile.role !== "tutor") {
            console.log("Can't drop ticket if you are not a tutor");
        } else {
            try {
                const docRef = doc(db, "tickets", data.ticketId);
                await updateDoc(docRef, { tutorId: null });

                console.log("Ticket dropped successfully");
            } catch (error) {
                console.error("Error dropping ticket:", error);
            }
        }
    };

    return <button onClick={handleButtonClick}>Drop Ticket</button>;
};

export const CloseTicketButton = () => {
    // TODO: Make button toggle closed status (open ticket if its closed/close ticket if its open)
    const { currentUser, profile } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleButtonClick = async () => {
        const roleStatus = profile.role + "Status";
        try {
            const docRef = doc(db, "tickets", data.ticketId);
            await updateDoc(docRef, { [roleStatus]: "closed" });
            // TODO: close ticket if both statuses are closed
            // const ticket = await docRef.onSnapshot().data();
            // if (ticket.tutorStatus === ticket.studentStatus === "closed") {
            //     await updateDoc(docRef, { status: "closed" });
            // }
            console.log("Ticket closed successfully");
        } catch (error) {
            console.error("Error closing ticket:", error);
        }
    };

    return <button onClick={handleButtonClick}>Close Ticket</button>;
};