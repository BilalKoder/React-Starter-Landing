import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import Toast from "../libs/Toast";
import PasswordReset from "./PasswordReset";
import SendLink from "./SendLink";
import "./styles/ResetPassword.css";

const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  console.log("token", token);

  return (
    <>
      <div className="reset-password-container">
        <div className="reset-password-card">
          {token ? <PasswordReset /> : <SendLink />}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
