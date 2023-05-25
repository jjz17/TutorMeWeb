import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  // send to dashboard if logged in
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  // otherwise go to the login page
  return <Navigate to="/login" />;
};

export default Home;
