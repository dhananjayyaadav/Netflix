import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../AuthContext/apiCalls";
import { AuthContext } from "../AuthContext/Authcontext";
import "./Login.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, error, isFetching } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const handelLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    console.log(error);
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            className="logo"
          />
        </div>
      </div>
      <div className="container">
        <form action="">
          <h1>Sign In</h1>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handelLogin}>Sign in</button>
          {isFetching && <span style={{ color: "white" }}>Loadin ....</span>}
          {error && (
            <span style={{ color: "white" }}>
              Wrong username or password !!!
            </span>
          )}
          <span>
            New to netflix
            <Link className="link" to="/register">
              <b>Sign up now</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </small>
        </form>
      </div>
    </div>
  );
};
