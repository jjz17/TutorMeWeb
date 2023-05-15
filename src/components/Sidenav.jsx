import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, PlusSquare, Calendar, Home } from 'react-feather';

const Sidenav = () => {
    return (
        <div className="sidenav">
            <Link to="/chats">
                <MessageCircle color='#ffffff' />
            </Link>
            <Link to="/create-ticket">
                <PlusSquare color="#ffffff" />
            </Link>
            <Link to="/planner">
                <Calendar color="#ffffff" />
                {/* <img src={Cam} alt="" /> */}
            </Link>
            <Link to="/" style={{ color: '#FFF' }}>
                <Home color="#ffffff" />
            </Link>
        </div>
    );
};

export default Sidenav;