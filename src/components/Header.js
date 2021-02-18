import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LogoutScreen from "../screens//LogoutScreen";
import LoginScreen from "../screens/LoginScreen";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <header>
      <Route path="/logout" component={LogoutScreen} />
      <Route path="/login" component={LoginScreen} />
      <img
        className="header-image"
        src="/images/header-logo.png"
        alt="header-logo"
      />
      <a href="/">The Smartphone store</a>
      <div className="header-link">
        {isLoggedIn === false ? (
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} />
            &nbsp;Login
          </Link>
        ) : (
          <Link to="/logout" onClick={() => {}}>
            <FontAwesomeIcon icon={faUser} />
            &nbsp;Logout
          </Link>
        )}
      </div>
    </header>
  );
}
