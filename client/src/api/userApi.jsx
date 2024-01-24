import { API } from "../config";

export const register = (email, username, password) => {
  let user = { email, username, password };
  return fetch(`${API}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const verifyEmail = (token) => {
  return fetch(`${API}/api/user/verifyemail/${token}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const login = (email, password) => {
  let user = { email, password };

  return fetch(`${API}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const authenticate = (data) => {
  return localStorage.setItem("jwt", JSON.stringify(data));
};

export const isAuthentiated = () => {
  const loggedIn = JSON.parse(localStorage.getItem("jwt"));

  if (loggedIn) {
    return loggedIn;
  }

  return false;
};

export const forgotPassword = (email) => {
  return fetch(`${API}/api/user/forgetpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const resetPassword = (password, token) => {
  return fetch(`${API}/api/user/resetpassword/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const logout = () => {
  localStorage.removeItem("jwt");
  return fetch(`${API}/api/user/signout`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getAllUsers = () => {
  return fetch(`${API}/api/user/getuserlist`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateRole = (id, role) => {
  return fetch(`${API}/api/user/updaterole/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
