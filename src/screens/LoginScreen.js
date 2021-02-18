import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import Fade from "react-reveal/Fade";
import { Redirect, useHistory } from "react-router-dom";

export default function Login() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const message = useSelector((state) => state.user.message);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const changeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const changePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      history.push("/orders");
    }
  }, [isLoggedIn, history]);

  return isLoggedIn === true ? (
    <Redirect to="/orders" />
  ) : (
    <div>
      <Fade bottom cascade>
        <div className="center">
          <form className="login-form" onSubmit={handleLogin}>
            <ul className="form-container">
              <li>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={changeEmail}
                />
              </li>
              <div className="login-message">{message}</div>
              <li>
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  required
                  onChange={changePassword}
                />
              </li>
              <li>
                <button className="button" type="submit">
                  Log in
                </button>
              </li>
            </ul>
          </form>
        </div>
      </Fade>
    </div>
  );
}
