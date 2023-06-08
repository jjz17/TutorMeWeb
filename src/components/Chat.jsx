import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
// import ClaimTicketButton from "./ClaimTicketButton";
import { ClaimTicketButton, DropTicketButton } from "./TicketButtons";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useNavigate, Link } from "react-router-dom";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-info">
        <p>Ticket</p>
        {data.ticket && (
          <span>
            : {data.ticket?.description}
            <ClaimTicketButton />
            <DropTicketButton />
          </span>
        )}
        {/* TODO: Add ticket claiming button to assign tutor */}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
