import { Search, Notifications, ArrowDropDown } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../AuthContext/Authactions";
import { AuthContext } from "../AuthContext/Authcontext";
import "./Navbar.scss";

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [color, setColor] = useState(false);
  window.onscroll = () => {
    setColor(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={color ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="navbar-left">
          <Link className="link" to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
              className="netflix-logo"
            />
          </Link>
          <Link className="link" to="/">
            <span>Homepage</span>
          </Link>
          <Link className="link" to="/series">
            <span className="navbar-visible">Series</span>
          </Link>
          <Link className="link" to="/movie">
            <span className="navbar-visible">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="navbar-right">
          <Search className="icons remv" />
          <span className="remv">KID</span>
          <Notifications className="icons remv" />
          <img
            src={
              user.profilePic ||
              "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icons" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
