import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCard from "./PaymentCard";
import "./payment.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_ID);

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
