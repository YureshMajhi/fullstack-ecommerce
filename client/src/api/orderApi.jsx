import { API } from "../config";

export const placeOrder = (order) => {
  return fetch(`${API}/api/order/placeorder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const getuserorders = (userId) => {
  return fetch(`${API}/api/order/getuserorder/${userId}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const getorderdetails = (orderId) => {
  return fetch(`${API}/api/order/getorderdetails/${orderId}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const getAllOrders = () => {
  return fetch(`${API}/api/order/getorders`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
