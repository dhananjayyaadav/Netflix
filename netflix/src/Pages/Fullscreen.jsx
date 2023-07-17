import { ArrowBackOutlined } from "@mui/icons-material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Fullscreen.scss";

export const Fullscreen = () => {
  const location = useLocation();
  const movie = location.state.movie;
  return (
    <div className="fullscreen">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined className="back-icon" />
          Home
        </div>
      </Link>
      <video
        src={movie.video}
        className="fullscreen-video"
        autoPlay
        progress
        controls
      ></video>
    </div>
  );
};
