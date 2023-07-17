import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";

import "./Listitem.scss";

export const Listitems = ({ item, index }) => {
  const [isHovered, setHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get(`movie/find/${item}`);
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to="/watch" state={{ movie: movie }}>
      <div
        className="listitems"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="list-itemInfo">
              <div className="list-icons">
                <PlayArrow className="list-icon" />
                <Add className="list-icon" />
                <ThumbUpOutlined className="list-icon" />
                <ThumbDownOutlined className="list-icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hour 45 mins</span>
                <span className="limit">{movie.limit}+</span>
                <span>{movie.year}</span>
              </div>
              <div className="item-desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
