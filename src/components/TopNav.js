import React from "react";
import { Link } from "react-router-dom";
import "./styles/TopNav.css";

const TopNav = () => {
  return (
    <div className="top-nav-container">
      <Link to="/overview">
        <img src={require("../assets/logo.jpg")} alt="" />
      </Link>
      <Link to="/home" className="link">
        <span className="dark-light nav-text">Home</span>
      </Link>
      <div style={{ position: "relative" }}>
        <span className="dark-light nav-text editor">Online Edtitor</span>
      </div>
      <span
        className="dark-light nav-text"
        style={{ position: "absolute", right: "2rem" }}
      >
        Tareef Roustom
      </span>
    </div>
  );
};

export default TopNav;
