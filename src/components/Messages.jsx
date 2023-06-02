import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "ticketChats", data.ticketId), (doc) => {
      // doc.exists() && setMessages(doc.data().messages);
      if (doc.exists()) {
        setMessages(doc.data().messages);
      } else {
        setMessages([]);
      }
    });

    return () => {
      unSub();
    };
  }, [data.ticketId]);

  // console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        // <Message message={m} key={m.id} />
        <p>{m}</p>
      ))}
    </div>
  );
};

export default Messages;
