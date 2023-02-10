import { useEffect } from "react";
import { useState } from "react";
import ReactSlider from "react-slider";
import "./styles/Slider.css";

const Slider = ({ currentValue, handleChange }) => {
  useEffect(() => {
    if (currentValue > 10000) {
      const doc = document.querySelector("customSlider-thumb")?.classList;
      doc?.add("forward");
    }
  }, [currentValue]);
  return (
    <>
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        min={1}
        max={10}
        defaultValue={0}
        value={currentValue}
        onChange={handleChange}
      />
    </>
  );
};

export default Slider;
