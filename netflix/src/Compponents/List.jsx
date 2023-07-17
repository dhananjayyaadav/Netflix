import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import "./List.scss";
import { Listitems } from "./Listitems";

export const List = ({ list }) => {
  const [slideNum, setSlideNum] = useState(0);
  const [show, setShow] = useState(false);

  const listRef = useRef();

  const handelClick = (direction) => {
    setShow(true);
    let distance = listRef.current.getBoundingClientRect().x - 50; // distance of the container
    if (direction === "left" && slideNum > 0) {
      setSlideNum(slideNum - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNum < 5) {
      setSlideNum(slideNum + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="list-title">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          onClick={() => handelClick("left")}
          className="icons left"
          style={{ display: !show && "none" }}
        />

        <div className="container" ref={listRef}>
          {list.content.map((listItem, i) => (
            <Listitems key={i} item={listItem} index={i} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          onClick={() => handelClick("right")}
          className="icons right"
        />
      </div>
    </div>
  );
};
