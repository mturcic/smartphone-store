import {
  LOGIN_USER,
  LOGIN_FAILED,
  LOGOUT_USER,
  LOGOUT_FAILED,
  REGISTER_USER,
  REGISTER_FAILED,
} from "../types";

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
        ...state,
        message: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT_FAILED:
      return {
        message: action.payload,
        isLoggedIn: true,
      };
    case REGISTER_USER:
      return {
        ...state,
        message: "User " + action.payload + " successfully registered",
        isRegistered: true,
      };
    case REGISTER_FAILED:
      return { ...state, message: action.payload, isRegistered: false };
    default:
      return state;
  }
};
