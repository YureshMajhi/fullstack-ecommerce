import { API } from "../config";

export const getStripeKey = () => {
  return fetch(`${API}/payment/getStripeKey`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const makepayment = (amount) => {
  return fetch(`${API}/payment/processPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
