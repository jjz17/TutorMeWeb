import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import { useNavigate, Link } from "react-router-dom";
import StigmiLogo from "../img/img.png";

const Sidenav = () => {
    return (
        <div className="sidenav">
            {/* <Navbar />
      <Search/>
      <Chats/> */}
            {/* <p> */}
                {/* <Link to="/next" style={{ color: '#FFF' }}> */}
                <Link to="/next">
                    {/* next */}
                    <img src={StigmiLogo} alt=""/>
                </Link>
                <Link to="/next">
                    {/* next */}
                    <img src={StigmiLogo} alt=""/>
                </Link>
                <Link to="/next">
                    {/* next */}
                    <img src={StigmiLogo} alt=""/>
                </Link>
                <Link to="/next">
                    {/* next */}
                    <img src={StigmiLogo} alt=""/>
                </Link>
            {/* </p> */}

            {/* <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => e}
            />
            <label htmlFor="next">
                <img src={"../img/img.png"} alt="" />
            </label> */}
            {/* <img src={StigmiLogo} alt="" height={80}/>
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div> */}
        </div>
    );
};

export default Sidenav;