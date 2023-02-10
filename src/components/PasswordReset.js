import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { submitNewPassword } from "supertokens-web-js/recipe/thirdpartyemailpassword";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  async function newPasswordEntered() {
    if (!newPassword) {
      return;
    }
    startLoading();
    try {
      let response = await submitNewPassword({
        formFields: [
          {
            id: "password",
            value: newPassword,
          },
        ],
      });

      if (response.status === "FIELD_ERROR") {
        response.formFields.forEach((formField) => {
          if (formField.id === "password") {
            toast.error(formField.error);
            // New password did not meet password criteria on the backend.
          }
        });
      } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
        // the password reset token in the URL is invalid, expired, or already consumed
        toast.error("Password reset failed please try again.");
        // Navigate to reset password
        navigate("/auth/reset-password");
      } else {
        toast.success("Successfully changed the password");
        navigate("/");
      }
      stopLoading();
    } catch (err) {
      stopLoading();
      toast.error("Something went wrong.");
    }
  }

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <>
      <h2>Change your password</h2>
      <span className="center-text">
        Enter a new password below to change your password
      </span>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={handleChange}
        className="reset-password-input"
      />
      <button onClick={newPasswordEntered} className="blue-btn">
        {isLoading ? (
          <span>Changing password</span>
        ) : (
          <span>Change password</span>
        )}
      </button>
    </>
  );
};

export default PasswordReset;
