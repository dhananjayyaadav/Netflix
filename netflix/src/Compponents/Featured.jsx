import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config";
import "./Featured.scss";

export const Featured = ({ type, setGenre }) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await axiosInstance.get(
          `movie/random${type ? "?type=" + type : ""}`
        );
        setMovie(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomMovie();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Tv Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option disabled>Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="anime">Anime</option>
          </select>
        </div>
      )}
      <img src={movie.img} alt="" />
      <div className="info">
        <span className="img-title">{movie.imgTitle}</span>
        <span className="desc">{movie.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};
