import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import StigmiLogo from "../img/stigmiLogo.png";
import { RadioGroup, RadioButton } from "react-radio-buttons";

const Register = () => {
  const [role, setRole] = useState("student");
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      console.log("Haven't created user");

      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log("Created user");

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      // TODO: Handle when avatar image isn't uploaded
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "webUsers", res.user.uid), {
              uid: res.user.uid,
              displayName,
              role,
              email,
              photoURL: downloadURL,
            });
            console.log("User created on firestore");

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            console.log("userChats created for user on firestore");

            //create empty user tickets on firestore if user is student
            if (role === "student") {
              await setDoc(doc(db, "userTickets", res.user.uid), {
                open: [],
                closed: [],
              });
              console.log("userTickets created for user on firestore");
            }

            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <img src={StigmiLogo} alt="" />
        {/* <span className="logo">Stigmi Learning</span> */}
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <RadioGroup onChange={handleRoleChange} value={role}>
            <RadioButton value="student">Student</RadioButton>
            <RadioButton value="tutor">Tutor</RadioButton>
          </RadioGroup>
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
          {err && <span>{errorMessage}</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
