import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import SideNav from "../components/Sidenav";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <SideNav />
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
