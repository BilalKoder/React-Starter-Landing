import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmail } from "supertokens-web-js/recipe/emailverification";

const VerifyCode = ({ token }) => {
  const navigate = useNavigate();

  async function consumeVerificationCode() {
    try {
      let response = await verifyEmail();
      if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
        // This can happen if the verification code is expired or invalid.
        // You should ask the user to retry
        toast.error(
          "Oops! Seems like the verification link expired. Please try again"
        );
        navigate("/auth/verify-email"); // back to the email sending screen.
      } else {
        // email was verified successfully.
        toast.success("Email has been verified");
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }
  useEffect(() => {
    if (token) {
      consumeVerificationCode();
    }
  }, [token]);
  return <div className="loader"></div>;
};

export default VerifyCode;
