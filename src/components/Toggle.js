import React from "react";
import "./styles/Toggle.css";

const Toggle = ({ checked, handleToggle }) => {
  return (
    <>
      <label class="switch">
        <input
          type="checkbox"
          id="togBtn"
          checked={checked}
          onChange={handleToggle}
        />
        <div class="slider round"></div>
      </label>
    </>
  );
};

export default Toggle;
