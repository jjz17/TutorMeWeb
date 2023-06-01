import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import Tickets from "./Tickets";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      {/* <Chats /> */}
      <Tickets />
    </div>
  );
};

export default Sidebar;
