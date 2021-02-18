import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <div>
      <Fade bottom cascade>
        <div className="center">
          <div className="logout-form">
            <ul className="form-container">
              <li>
                <label>Are you sure you want to log out?</label>
                <div className="login-message">{message}</div>
              </li>
              <div className="logout-buttons">
                <button className="button" onClick={handleLogout}>
                  Yes
                </button>
                &nbsp;&nbsp;
                <button
                  className="button"
                  onClick={() => history.push("/orders")}
                >
                  No
                </button>
              </div>
            </ul>
          </div>
        </div>
      </Fade>
    </div>
  );
}
