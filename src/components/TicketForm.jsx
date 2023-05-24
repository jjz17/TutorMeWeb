import React, { useState, useContext } from "react";
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

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const file = e.target[0].files[0];
    const description = e.target[1].value;

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
              tutorId: null,
              date: Timestamp.now(),
              img: downloadURL,
            });

            // Add ticket to current user's ticket list
            await updateDoc(doc(db, "userTickets", currentUser.uid), {
              open: arrayUnion({
                id: ticketId,
              }),
            });
          });
          console.log("Ticket image uploaded");
        },
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
