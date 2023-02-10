import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaypalSubscription = ({ planId, userId }) => {
  const navigate = useNavigate();
  const handlePaymentSuccess = () => {
    toast.success("Subscription will be activated in under 5-10 minutes.", {
      autoClose: 15000,
    });
    navigate("/home");
  };
  return (
    <>
      <PayPalButtons
        style={{ label: "checkout", color: "blue" }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            /* Creates the subscription */
            plan_id: `${planId}`,
            custom_id: userId,
          });
        }}
        onApprove={(data, actions) => {
          handlePaymentSuccess();
          // alert(data.subscriptionID); // You can add optional success message for the subscriber here
        }}
      />
    </>
  );
};

export default PaypalSubscription;
