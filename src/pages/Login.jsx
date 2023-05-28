import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import StigmiLogo from "../img/stigmiLogo.png";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <img id="login-logo" src={StigmiLogo} alt="" />
        {/* <span className="logo">Stigmi Learning</span> */}
        <span className="title">Login to Stigmi Learning below!</span>
        <form onSubmit={handleSubmit}>
        <span>
          <p>Email</p>
          <input class="form-feild" type="email" placeholder="email" />
        </span>
        <span>
          <p>Password</p>
          <input class="form-feild" type="password" placeholder="password" />
        </span>
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
