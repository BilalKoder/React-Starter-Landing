import React from "react";
import TwitterIcon from "../assets/twitter.svg";
import MailIcon from "../assets/Mail.svg";

const FooterIcon = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <img src={MailIcon} alt="" />
      <img src={TwitterIcon} alt="" />
    </div>
  );
};

export default FooterIcon;
