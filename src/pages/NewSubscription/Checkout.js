import React, { useState, useEffect } from "react";
import "./styles/Checkout.css";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/userSlice";
import PaypalSubscription from "./PaypalSubscription";

const AnnualPlans = {
  14: "P-59W48494252269234MPAZF5I",
  24: "P-1LX03000B8004572PMPAZICY",
  28: "P-7YB157408X5192126MPAZMDQ",
  38: "P-95W35710R9390504KMPAZMIA",
  43: "P-1KY75467V6802174SMPAZMNY",
  48: "P-04W17727CN9342204MPAZMUI",
  57: "P-31L92017JR665210EMPAZMZQ",
  67: "P-4JE15895XX413730NMPAZM5A",
  72: "P-47F69245EF086150AMPAZNAA",
  76: "P-74829811NL603994HMPAZNDA",
};

const MonthlyPlans = {
  1.5: "P-2BA89850189568013MPAZGQQ",
  2.5: "P-1DD57276GY121211JMPAZHSI",
  3: "P-9UN498133U316511TMPAZIZY",
  4: "P-5UH930349P308222CMPAZKBQ",
  4.5: "P-9P5098398S0525810MPAZJFI",
  5: "P-32B36322K8155825TMPAZJIY",
  6: "P-0EC40814W1549253DMPAZKGA",
  7: "P-3N442707WN515924SMPAZKRQ",
  7.5: "P-28W75165AX2038324MPAZKUQ",
  8: "P-4FX68058BR430940UMPAZKXI",
};

const Checkout = () => {
  const { price } = useParams();
  const { user } = useSelector(getUserData);
  const [time, setTime] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(price);
  const location = useLocation();
  const [planId, setPlanId] = useState(null);

  useEffect(() => {
    const time = new URLSearchParams(location.search).get("time");
    setTime(time);
  }, []);

  useEffect(() => {
    if (time == "Annual" && price) {
      const id = AnnualPlans[parseInt(price)];
      setPlanId(id);
    } else if (time == "Monthly" && price) {
      const id = MonthlyPlans[price];
      setPlanId(id);
    }
  }, [time, price]);

  if (!price || !planId) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        alignItems: "center",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0rem",
          position: "relative",
        }}
      >
        <span className="dark-light">{time} Plan</span>
      </div>
      <h1>${calculatedPrice} USD</h1>
      <span className="free-trial-text">1 week free trial</span>
      <span className="dark-light">Cancel Anytime</span>
      <div className="checkout-card">
        <PaypalSubscription planId={planId} userId={user?.id} />

        <span
          className="dark-light"
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            left: "1rem",
            fontSize: "0.85rem",
          }}
        >
          Your subscription will automatically renew. You can cancel at any time
          on the Subscription page of your account or by submitting a support
          request. If you cancel, previous charges will not be refunded.
        </span>
      </div>
    </div>
  );
};

export default Checkout;
