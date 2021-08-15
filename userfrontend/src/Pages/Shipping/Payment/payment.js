import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCard from "./PaymentCard";
import "./payment.scss";

const stripePromise = loadStripe(
  "pk_test_51IiPSLGowqc4Ssvcb15zqkkinpFhevug3A2PSFjW4AHla3SQhOuiodRABrdtv5RW3MoAPScKXFvg0OGeUKReA2uv00ZOKf5nCq"
);

const Payment = () => {
  return (
    <div className="payment">
      <Elements stripe={stripePromise}>
        <PaymentCard />
      </Elements>
    </div>
  );
};

export default Payment;
