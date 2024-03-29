import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const openImageInNewTab = (path) => {
    console.log("Opening image in new tab");
    window.open(path, "_blank");
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="message-info">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* Update message send time here */}
        <span>just now</span>
      </div>
      <div className="message-content">
        {/* This works if the message contains an image and blank text */}
        {message.img && (
          <img
            src={message.img}
            onClick={() => openImageInNewTab(message.img)}
            alt=""
          />
        )}
        {message.text !== "" && <p>{message.text}</p>}
        {/* <p>{message.text}</p> */}
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  );
};

export default Message;
