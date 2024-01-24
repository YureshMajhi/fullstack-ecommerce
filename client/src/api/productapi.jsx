import { API } from "../config";

export const getAllProducts = () => {
  return fetch(`${API}/api/product/getproducts`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteProduct = (id) => {
  return fetch(`${API}/api/product/deleteproduct/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const addProduct = (token, product) => {
  return fetch(`${API}/api/product/addproduct`, {
    method: "POST",
    headers: {
      authentication: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getProduct = (id) => {
  return fetch(`${API}/api/product/getproduct/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateProduct = (id, token, product) => {
  return fetch(`${API}/api/product/updateproduct/${id}`, {
    method: "PATCH",
    headers: {
      authentication: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getFilteredProducts = (filters) => {
  return fetch(`${API}/api/product/getfilteredproduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
