import React from "react";
import "./style.css";
import TopNav from "../../components/TopNav";
import SubInfoContainer from "../../components/SubInfoContainer";
import TerminalSvg from "../../assets/terminal.svg";
import DocSvg from "../../assets/doc.svg";
import LinkedinSvg from "../../assets/linkedin.svg";
import EmailSvg from "../../assets/email.svg";
import CubeSvg from "../../assets/cube.svg";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <TopNav />
      <div className="overview-container">
        <h1 style={{ marginBottom: "2rem" }}>Welcome to Twain</h1>
        <div>
          <h2>Start with the basics</h2>
          <div className="overview-shortucts">
            <Link>
              <div style={{ position: "relative" }}>
                <img
                  alt=""
                  className="overview-card quickstart"
                  src={require("../../assets/gradient_card_1.webp")}
                />
                <span className="ovr-big-txt">Quickstart Tutorial</span>
                <span className="ovr-small-txt">
                  Learn by building a quick sample app
                </span>
              </div>
            </Link>
            <Link>
              <div style={{ position: "relative" }}>
                <img
                  alt=""
                  className="overview-card quickstart"
                  src={require("../../assets/gradient_card_2.webp")}
                />
                <span className="ovr-big-txt">Examples</span>
                <span className="ovr-small-txt">
                  Explore some example tasks
                </span>
              </div>
            </Link>
          </div>

          <h2>Build an application</h2>
          <div className="overview-grid">
            <div className="icon-item">
              <div className="icon-item-icon yellow-gradient-bg">
                <img src={TerminalSvg} alt="" />
              </div>
              <div className="icon-item-right">
                <span className="info-title">170+ Billion Parameteres AI</span>
                <span className="dark-light sm">
                  170+ Billion Parameteres AI
                </span>
              </div>
            </div>
            <div className="icon-item">
              <div className="icon-item-icon blue-gradient-bg">
                <img src={LinkedinSvg} alt="" />
              </div>
              <div className="icon-item-right">
                <span className="info-title">170+ Billion Parameteres AI</span>
                <span className="dark-light sm">
                  170+ Billion Parameteres AI
                </span>
              </div>
            </div>

            <div className="icon-item">
              <div className="icon-item-icon red-gradient-bg">
                <img src={CubeSvg} alt="" />
              </div>

              <div className="icon-item-right">
                <span className="info-title">170+ Billion Parameteres AI</span>
                <span className="dark-light sm">
                  170+ Billion Parameteres AI
                </span>
              </div>
            </div>
            <div className="icon-item">
              <div
                className="icon-item-icon pink-gradient-bg"
                style={{ padding: "13px" }}
              >
                <img src={DocSvg} alt="" />
              </div>
              <div className="icon-item-right">
                <span className="info-title">170+ Billion Parameteres AI</span>
                <span className="dark-light sm">
                  170+ Billion Parameteres AI
                </span>
              </div>
            </div>
            <div className="icon-item">
              <div className="icon-item-icon green-gradient-bg">
                <img src={EmailSvg} alt="" />
              </div>
              <div className="icon-item-right">
                <span className="info-title">170+ Billion Parameteres AI</span>
                <span className="dark-light sm">
                  170+ Billion Parameteres AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

{
  /* <div className="overview-container">
    <div className="overview-content">
      <h1>Welcome to Twain</h1>
      <h2>Start with the basics</h2>
      <div className="card-container">
        <img
          alt=""
          className="overview-card quickstart"
          src={require("../../assets/gradient_card_1.webp")}
        />
        <img
          alt=""
          className="overview-card examples"
          src={require("../../assets/gradient_card_2.webp")}
        />
      </div>
      <h2>Build an Application</h2>
    </div>
  </div>
  <SubInfoContainer /> */
}
