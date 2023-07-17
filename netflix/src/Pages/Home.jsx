import React, { useEffect, useState } from "react";
import { Featured } from "../Compponents/Featured";
import { List } from "../Compponents/List";
import { Navbar } from "../Compponents/Navbar";
import "./Home.scss";
import { Footer } from "../Compponents/Footer";
import { axiosInstance } from "../config";

export const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState("");
  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axiosInstance.get(
          `list${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
      <Footer />
    </div>
  );
};
