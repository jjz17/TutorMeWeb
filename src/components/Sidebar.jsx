import React, { useContext } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import Tickets from "./Tickets";
import { ChatContext } from "../context/ChatContext";

const Sidebar = () => {
  const { dispatch } = useContext(ChatContext);

  const handleSelect = () => {
    console.log("Reset ticket chats");
    dispatch({ type: "RESET" });
  }

  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      OPEN TICKETS
      <Tickets />
      {/* Clicking on this gray area resets chat context */}
      <div className="blank-space" style={{ backgroundColor: 'lightgray', height: "100px" }} onClick={() => handleSelect()}>
      </div>
    </div>
  );
};

export default Sidebar;
