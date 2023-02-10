import React from "react";
import DocSvg from "../assets/doc.svg";
import LinkedinSvg from "../assets/linkedin.svg";
import EmailSvg from "../assets/email.svg";
import CubeSvg from "../assets/cube.svg";
import TerminalSvg from "../assets/terminal.svg";

const SubInfoContainer = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <div className="sub-info-container">
        <div className="sub-info-container-s">
          <img src={DocSvg} alt="" className="doc-svg" />
          <div className="info-container">
            <span className="info-title">170+ Billion Parameteres AI</span>
            <span className="dark-light sm">170+ Billion Parameteres AI</span>
          </div>
        </div>
        <div className="sub-info-container-s">
          <img src={EmailSvg} alt="" className="email-svg" />
          <div className="info-container">
            <span className="info-title">170+ Billion Parameteres AI</span>
            <span className="dark-light sm">170+ Billion Parameteres AI</span>
          </div>
        </div>
        <div className="sub-info-container-s">
          <img src={LinkedinSvg} alt="" className="linkedin-svg" />
          <div className="info-container">
            <span className="info-title">170+ Billion Parameteres AI</span>
            <span className="dark-light sm">170+ Billion Parameteres AI</span>
          </div>
        </div>
        <div className="sub-info-container-s">
          <img src={CubeSvg} alt="" className="cube-svg" />
          <div className="info-container">
            <span className="info-title">170+ Billion Parameteres AI</span>
            <span className="dark-light sm">170+ Billion Parameteres AI</span>
          </div>
        </div>
        <div className="sub-info-container-s">
          <img src={TerminalSvg} alt="" className="terminal-svg" />
          <div className="info-container">
            <span className="info-title">170+ Billion Parameteres AI</span>
            <span className="dark-light sm">170+ Billion Parameteres AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubInfoContainer;
