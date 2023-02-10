import React from "react";
import "./styles/index.css";
import { useEffect } from "react";
import Subscription from "./Subscription";
import { useParams } from "react-router-dom";
import Checkout from "./Checkout";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/userSlice";
import Premium from "./Premium";
import { useEditSubscriptionMutation } from "../../services/api";

const NewSubscription = () => {
  const { price } = useParams();
  const { user } = useSelector(getUserData);
  const [updateSub] = useEditSubscriptionMutation();
  useEffect(() => {
    console.log("price", price);
  }, [price]);

  const handleEdit = () => {
    updateSub();
  };
  const isPremiumUser = user?.roles?.includes("premiumUser");
  if (isPremiumUser) {
    return <Premium />;
  }
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
          intent: "subscription",
          vault: true,
        }}
      >
        <div style={{ width: "calc(100vw - 20rem)", paddingBottom: "1rem" }}>
          {price ? <Checkout /> : <Subscription />}
        </div>
      </PayPalScriptProvider>
    </>
  );
};

export default NewSubscription;
