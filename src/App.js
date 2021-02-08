import React from "react";
import Background from "./components/Background";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <img
                className="header-image"
                src="/images/header-logo.png"
                alt="header-logo"
              />
              <a href="/">The Smartphone store</a>
              <div className="header-link">
                <Link to="/admin">
                  <FontAwesomeIcon icon={faUser} />
                  &nbsp;Orders
                </Link>
              </div>
            </header>
            <main>
              <Route path="/admin" component={AdminScreen} />
              <Route path="/" component={HomeScreen} exact />
            </main>
            <Background />
            <footer>
              All rights reserved.
              <a
                className="tag"
                href="https://www.github.com/mturcic"
                target="_blank"
                rel="noopener noreferrer"
              >
                &nbsp; © mturcic
              </a>
            </footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
