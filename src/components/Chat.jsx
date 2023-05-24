import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { useNavigate, Link } from "react-router-dom";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-info">
        <p>Chat</p>
        {data.user.displayName && <span>: with {data.user?.displayName}</span>}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
