import React from "react";
import { useSelector } from "react-redux";
import userSlice, { getUserData } from "../redux/userSlice";
import SendEmailVerificationComponent from "./SendEmailVerificationComponent";
import { useLocation } from "react-router-dom";
import VerifyCode from "./VerifyCode";

const VerifyEmail = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const { user } = useSelector(getUserData);

  console.log("user", user);
  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        {token ? (
          <VerifyCode token={token} />
        ) : (
          <SendEmailVerificationComponent />
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
