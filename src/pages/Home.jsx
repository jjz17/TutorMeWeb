import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  // send to dashboard or tutor dashboard if logged in
  const { currentUser, profile } = useContext(AuthContext);
  if (currentUser) {
    if (profile === "student") {
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/tutors" />;
    }
  }

  // otherwise go to the login page
  return <Navigate to="/login" />;
};

export default Home;
