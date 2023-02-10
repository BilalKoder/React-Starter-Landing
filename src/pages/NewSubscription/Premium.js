import React, { useEffect } from "react";
import {
  useCancelSubscriptionMutation,
  useEditSubscriptionMutation,
  useLazyGetPlanDetailsQuery,
} from "../../services/api";
import "./styles/Premium.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent";
import { formatDate } from "../../utils/formatDate";
import { toast } from "react-toastify";

const Premium = () => {
  const [cancelSubscription, { isLoading, isSuccess, isError }] =
    useCancelSubscriptionMutation();
  const [
    getPlanDetails,
    {
      data,
      isLoading: isPlanDetailsLoading,
      isError: isPlanDetailsError,
      isSuccess: isPlanDetailsSuccess,
    },
  ] = useLazyGetPlanDetailsQuery();
  const [
    editSubscription,
    {
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      isError: isEditError,
    },
  ] = useEditSubscriptionMutation();

  const handleCancel = () => {
    cancelSubscription();
  };

  const handleEdit = () => {
    editSubscription();
  };

  console.log("data", data);

  useEffect(() => {
    getPlanDetails();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    } else if (isSuccess) {
      toast.success("Your subscription will be cancelled under 5-10 minutes", {
        autoClose: 10000,
      });
    }
  }, [isError, isSuccess]);

  function addCommas(str) {
    if (typeof str != "string") {
      return;
    }
    let words = str.split(" ");
    let numIndex = words.findIndex((word) => !isNaN(word));
    let num = words[numIndex];
    let newNum = "";
    while (num.length > 3) {
      newNum = "," + num.substring(num.length - 3) + newNum;
      num = num.substring(0, num.length - 3);
    }
    newNum = num + newNum;
    words[numIndex] = newNum;
    return words.join(" ");
  }
  const plan_word = addCommas(data?.name);
  console.log(plan_word);
  if (isPlanDetailsError) {
    return (
      <div className="premium-container">
        <ErrorComponent handleLoading={() => getPlanDetails()} />
      </div>
    );
  }
  if (isPlanDetailsLoading || !data) {
    return (
      <div className="premium-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="premium-container">
      <label>Manage your subscription</label>
      <span className="light-dark plan-details-text">
        You're subscribed to {plan_word}
      </span>
      <span className="light-dark plan-details-text">
        Your next payment is due on {formatDate(data?.next_billing_time)}
      </span>
      <button onClick={handleCancel} className="cancel-sub">
        {isLoading ? (
          <span>Cancelling Subscription</span>
        ) : (
          <span>Cancel subscription</span>
        )}
      </button>
    </div>
  );
};

export default Premium;
