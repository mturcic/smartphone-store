import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import Fade from "react-reveal/Fade";
import { Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isRegistered = useSelector((state) => state.user.isRegistered);
  const message = useSelector((state) => state.user.message);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const changeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

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
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (isRegistered === true) {
      history.push("/login");
    }
  }, [isRegistered, history]);

  return isLoggedIn === true ? (
    <Redirect to="/orders" />
  ) : (
    <div>
      <Fade bottom cascade>
        <div className="center">
          <form className="login-form" onSubmit={handleLogin}>
            <ul className="form-container">
              <li className="user-icon">
                <FontAwesomeIcon icon={faUser} size="3x" />
              </li>
              <li>
                <label>Please enter your registration data</label>
              </li>
              <div className="login-message">{message}</div>
              <li>
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  placeholder="At least 5 characters"
                  required
                  onChange={changeName}
                />
              </li>
              <li>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Must be an email"
                  required
                  onChange={changeEmail}
                />
              </li>
              <li>
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  placeholder="At least 5 characters"
                  required
                  onChange={changePassword}
                />
              </li>
              <li>
                <button className="button" type="submit">
                  Register
                </button>
              </li>
            </ul>
          </form>
        </div>
      </Fade>
    </div>
  );
}
