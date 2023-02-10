import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "./Slider";
import "./styles/index.css";

import { useLocation, useNavigate } from "react-router-dom";
import Toggle from "../../components/Toggle";
import SubInfoContainer from "../../components/SubInfoContainer";

const Subscription = () => {
  const [price, setPrice] = useState("1.5");
  const [currentValue, setCurrentValue] = useState(1);
  const [time, setTime] = useState("Annual");
  const [checked, setIsChecked] = useState(true);
  const location = useLocation();

  const handleChange = (value) => {
    setCurrentValue(value);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/subscription/${price}?time=${time}`);
  };
  const navigateToSales = () => {
    navigate(`/contact-sales`);
  };

  useEffect(() => {
    if (currentValue == 1) {
      if (time === "Annual") {
        let calc = 1.5 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(1.5);
      }
    } else if (currentValue == 2) {
      if (time === "Annual") {
        let calc = 2.5 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(2.5);
      }
    } else if (currentValue == 3) {
      if (time === "Annual") {
        let calc = 3 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(3);
      }
    } else if (currentValue == 4) {
      if (time === "Annual") {
        let calc = 4 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(4);
      }
    } else if (currentValue == 5) {
      if (time === "Annual") {
        let calc = 4.5 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(4.5);
      }
    } else if (currentValue == 6) {
      if (time === "Annual") {
        let calc = 5 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(5);
      }
    } else if (currentValue == 7) {
      if (time === "Annual") {
        let calc = 6 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(6);
      }
    } else if (currentValue == 8) {
      if (time === "Annual") {
        let calc = 7 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(7);
      }
    } else if (currentValue == 9) {
      if (time === "Annual") {
        let calc = 7.5 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(7.5);
      }
    } else if (currentValue == 10) {
      if (time === "Annual") {
        let calc = 8 * 12;
        let discount = (80 / 100) * calc;
        setPrice(discount.toFixed(1));
      } else {
        setPrice(8);
      }
    }
  }, [currentValue, time]);
  useEffect(() => {
    if (checked) {
      setTime("Annual");
    } else {
      setTime("Monthly");
    }
  }, [checked]);

  const handleToggle = () => {
    setIsChecked(!checked);
  };

  return (
    <>
      <div className="subscription-container">
        <div
          style={{
            position: "absolute",
            top: "4.3rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Toggle checked={checked} handleToggle={handleToggle} />
          <span
            style={{
              position: "absolute",
              left: "3rem",
              whiteSpace: "nowrap",
            }}
          >
            {time}
          </span>
          {time === "Annual" && (
            <span
              style={{
                color: "var(--blue)",
                position: "absolute",
                left: "6.5rem",
                whiteSpace: "nowrap",
              }}
            >
              (20% discount)
            </span>
          )}
        </div>
        <div className="subscription-card sb">
          <div className="card-header sb"></div>
          <span className="plan-name">Starter Plan</span>
          {time === "Monthly" && <h1>${price}/ Month</h1>}
          {time === "Annual" && <h1>${price}/ Year</h1>}

          <span className="dark-light">
            {currentValue * 10000} words a month
          </span>
          <Slider currentValue={currentValue} handleChange={handleChange} />
          <div style={{ marginTop: "3rem" }}>
            <h3>Included</h3>
          </div>
          <ul>
            <li className="dark-light">
              A 7 day free trial & money back gurantee
            </li>
            <li className="dark-light">In browser text generation</li>
            <li className="dark-light">Free text prompting</li>
            <li className="dark-light">170+ Billion Parameteres AI</li>
            <li className="dark-light">Online editor</li>
            <li className="dark-light">Extension Notepad</li>
            <li className="dark-light">Save and browse your text</li>
            <li className="dark-light">And a whole lot of writing</li>
          </ul>
          <button className="sub-btn continue" onClick={handleNavigate}>
            Continue
          </button>
        </div>
        <div className="subscription-card sl">
          <div className="card-header sl"></div>
          <span className="plan-name">Data Plan</span>
          <h1>Get in touch</h1>
          <div style={{ marginTop: "4.2rem" }}>
            <h3>Included</h3>
            <ul>
              <li className="dark-light">Everything in Starter and</li>
              <li className="dark-light">A whole lot more writing</li>
              <li className="dark-light">A one click custom model training</li>
              <li className="dark-light">Extension access to custom models</li>
            </ul>
            <button className="sub-btn sales" onClick={navigateToSales}>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
      <SubInfoContainer />
    </>
  );
};

export default Subscription;
