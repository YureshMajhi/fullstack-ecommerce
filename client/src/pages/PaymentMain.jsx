import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { getStripeKey, makepayment } from "../api/paymentApi";
import PaymentForm from "./PaymentForm";

import "./paymentForm.css";

export default function PaymentMain() {
  const [clientSecret, setClientSecret] = useState("");
  let [stripeKey, setStripeKey] = useState("");
  const amount = sessionStorage.getItem("total");

  useEffect(() => {
    getStripeKey().then((data) => {
      setStripeKey(data.STRIPEAPIKEY);
    });

    makepayment(amount * 100).then((data) => {
      setClientSecret(data.clientSecret);
    });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="PaymentMain">
      {stripeKey && clientSecret && (
        <Elements options={options} stripe={loadStripe(stripeKey)}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}
