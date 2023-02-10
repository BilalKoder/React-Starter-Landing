import React, { useState } from "react";
import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";
import { toast } from "react-toastify";

const SendEmailVerificationComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function sendEmail() {
    setIsLoading(true);
    try {
      let response = await sendVerificationEmail();
      if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
        // This can happen if the info about email verification in the session was outdated.
        // Redirect the user to the home page
        window.location.assign("/");
      } else {
        // email was sent successfully.
        toast.warn("Please check your email and click the link in it");
      }
      setIsLoading(false);
    } catch (err) {
      console.log("error", err);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  }
  return (
    <>
      <h2>Send verification link</h2>
      <span className="center-text">
        To confirm your email address please click on the link that will be sent
        to you.
      </span>
      <button className="blue-btn" onClick={sendEmail}>
        {isLoading ? <span> Sending link</span> : <span>Send link</span>}
      </button>
    </>
  );
};

export default SendEmailVerificationComponent;
