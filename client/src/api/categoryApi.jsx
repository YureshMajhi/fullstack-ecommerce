import { API } from "../config";

export const getAllCategories = () => {
  return fetch(`${API}/api/category/`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const addCategory = (title, token) => {
  return fetch(`${API}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateCategory = (id, title, token) => {
  return fetch(`${API}/api/category/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getCategoryDetail = (id) => {
  return fetch(`${API}/api/category/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteCategory = (id) => {
  return fetch(`${API}/api/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application-json",
    },
  })
    .then((response) => response.json)
    .catch((error) => console.log(error));
};
