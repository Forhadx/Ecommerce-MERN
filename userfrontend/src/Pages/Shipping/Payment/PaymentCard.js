import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.scss";

const Payment = () => {
  const [email, setEmail] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      return;
    }
    const res = await axios.post("http://localhost:5000/pay", { email: email });
    console.log("res: ", res);
    const clientSecret = res.data["client_secret"];
    console.log("clientSecret: ", clientSecret);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
          // cart product details
          //cartProduct: [...]
        },
      },
    });
    console.log("result: ", result);
    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money is in the bank!");
        console.log("payment Id: ", result.paymentIntent.id);
        // save payment id on db
        // clear all cart data
        // go to new page that show success payment
      }
    }
  };

  return (
    <React.Fragment>
      <h1>Complete Your Payment</h1>
      <label>Email</label>
      <input
        type="email"
        placeholder="enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>
        Payment<span>(4242 4242 4242 4242)</span>
      </label>
      <div>
        <CardElement />
      </div>
      <button onClick={handleSubmit}>
        Pay <span>434 ৳ </span>
      </button>
    </React.Fragment>
  );
};

export default Payment;
