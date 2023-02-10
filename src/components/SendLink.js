import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/thirdpartyemailpassword";

const SendLink = () => {
  const [email, setValue] = useState("");
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  async function sendEmailClicked() {
    if (!email) {
      return;
    }
    startLoading();
    try {
      let response = await sendPasswordResetEmail({
        formFields: [
          {
            id: "email",
            value: email,
          },
        ],
      });

      if (response.status === "FIELD_ERROR") {
        // one of the input formFields failed validaiton
        response.formFields.forEach((formField) => {
          if (formField.id === "email") {
            toast.error("Invalid email syntax");
            // Email validation failed (for example incorrect email syntax).
          }
        });
      } else {
        // reset password email sent.
        toast.success("Please check your email for the password reset link");
      }
      stopLoading();
    } catch (err) {
      stopLoading();
      toast.error("Something went wrong.");
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h2>Reset your password</h2>
      <span className="center-text">
        We will send you an email to reset your password
      </span>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={email}
        className="reset-password-input"
      />
      <button onClick={sendEmailClicked} className="blue-btn">
        {isLoading ? <span>Sending Email</span> : <span>Email me</span>}
      </button>
    </>
  );
};

export default SendLink;
