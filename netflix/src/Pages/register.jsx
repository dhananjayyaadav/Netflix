import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";
import "./Register.scss";

export const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const handelClick = () => {
    setEmail(emailRef.current.value);
  };

  const handelInput = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post("auth/register", {
        username,
        email,
        password,
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMsg(error);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            className="register-logo"
          />
          <Link to="/login">
            <button>SignIn</button>
          </Link>
        </div>
      </div>
      <div className="register-container">
        <h1>
          Unlimited movies, TV <br /> shows, and more.
        </h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              required
            />
            <button onClick={handelClick}>Get Started</button>
          </div>
        ) : (
          <form className="input">
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handelInput}>Start</button>
          </form>
        )}
        {loading ? (
          <span style={{ color: "white" }}>Loading please wait!!!</span>
        ) : (
          ""
        )}
        {error ? (
          <span style={{ color: "white" }}>User already exists</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
