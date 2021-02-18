import { LOGIN_USER, LOGIN_FAILED, LOGOUT_USER, LOGOUT_FAILED } from "../types";
const axios = require("axios").default;

export const login = (email, password) => (dispatch) => {
  axios
    .post("http://localhost:3000/api/user/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      dispatch({ type: LOGIN_USER, payload: response.data });
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      return response.data;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED, payload: err.response.statusText });
    });
};

export const logout = () => (dispatch) => {
  axios
    .get("http://localhost:3000/api/user/logout")
    .then((response) => {
      dispatch({ type: LOGOUT_USER, payload: response });
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_FAILED, payload: err.response.statusText });
    });
};
