import React from "react";
import "./styles/ErrorComponent.css";

const ErrorComponent = ({ handleLoading }) => {
  return (
    <div className="error-container">
      <span>Something went wrong</span>
      <button className="try-again-btn" onClick={handleLoading}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorComponent;
