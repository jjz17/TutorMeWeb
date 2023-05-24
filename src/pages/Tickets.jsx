import React, { useState, useContext } from "react";
import SideNav from "../components/Sidenav";
import TicketForm from "../components/TicketForm";
import { AuthContext } from "../context/AuthContext";

const Tickets = () => {

  const { currentUser } = useContext(AuthContext);
  const role = currentUser.role;

  if (role === "student") {
    
  }

  return (
    <div className="tickets">
      <div className="container">
        <SideNav />
        {/* <div className="chat-info">
                    <span>Create Ticket</span>
                </div> */}
        <TicketForm />
      </div>
    </div>
  );
};

export default Tickets;
