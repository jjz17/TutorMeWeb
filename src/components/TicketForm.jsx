import React, { useState, useContext, useRef } from "react";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  arrayUnion,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const TicketForm = () => {
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { currentUser, profile } = useContext(AuthContext);
  const textbookRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent non-students from creating tickets
    if (profile.role !== "student") {
      console.log(
        "Only students can open tickets, your role is:",
        profile.role
      );
      // Clear textbox
      textbookRef.current.value = "";
      return;
    }

    const file = e.target[0].files[0];
    const description = e.target[1].value;

    // Require attached file
    if (file == null) {
      setErr(true);
      setErrorMessage("Attached file is required");
      return;
    }

    setLoading(true);

    try {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          const ticketId = uuid();
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //create ticket on firestore
            await setDoc(doc(db, "tickets", ticketId), {
              description: description,
              img: downloadURL,
              date: Timestamp.now(),
              studentId: currentUser.uid,
              tutorId: null,
              messages: [
                // Add first message as the image + description
                {
                  id: uuid(),
                  text: description,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                },
              ],
              status: "open", // Options will be "open", implicitly "in progress" when tutorId != null, and "closed"
            });

            // Add ticket to current user's ticket list
            await updateDoc(doc(db, "userTickets", currentUser.uid), {
              open: arrayUnion({
                id: ticketId,
              }),
            });
          });
          console.log("Ticket image uploaded");

          // navigate("/dashboard");

          // Clear textbox
          textbookRef.current.value = "";
        }
      );
    } catch (err) {
      setErr(true);
      setErrorMessage(err.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="ticket-form">
      <div className="form-container">
        <div className="form-wrapper">
          {/* <img src={StigmiLogo} alt="" /> */}
          {/* <span className="logo">Stigmi Learning</span> */}
          <span className="title">
            We're here to help! Submit a question here to be answered during
            working hours
          </span>
          <form onSubmit={handleSubmit}>
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              {/* <img src={Add} alt="" /> */}
              <span>Attach a file</span>
            </label>
            <input
              required
              type="text"
              placeholder="Brief problem description"
              ref={ref}
            />
            <button disabled={loading}>Submit</button>
            {loading && "Creating the ticket..."}
            {err && <span>Something went wrong</span>}
            {err && <span>{errorMessage}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
