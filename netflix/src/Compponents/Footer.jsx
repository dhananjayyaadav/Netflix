import React from "react";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="wrapper">
        <div className="footer-left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <div className="quickLinks">
            <h2>Quick Links</h2>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Explore</li>
              <li>Help & Support</li>
              <li>Promotion</li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <div className="info">
            All Right of netflix is licensed under netflix.org
            <br /> All rights reserve
            <br /> copyright &#169; 2022
          </div>
          <span>Pay us using</span>
          <img
            src="https://www.transparentpng.com/download/payment-method/WNusu8-payment-method-kinds-transparent-picture.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
