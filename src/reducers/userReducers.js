import { LOGIN_USER, LOGIN_FAILED, LOGOUT_USER, LOGOUT_FAILED } from "../types";

export const userReducer = (
  state = {
    isLoggedIn: false,
    message: "",
  },
  action
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        token: action.payload.token,
        isLoggedIn: true,
      };
    case LOGIN_FAILED:
      return {
        message: action.payload,
        isLoggedIn: false,
      };
    case LOGOUT_USER:
      return {
        isLoggedIn: false,
        message: "",
      };
    case LOGOUT_FAILED:
      return {
        message: action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
