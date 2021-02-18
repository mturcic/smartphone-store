import React from "react";
import Background from "./components/Background";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { Orders } from "./components/Orders";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <Header />
            <main>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/orders" component={Orders} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/logout" component={LogoutScreen} />
            </main>
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
            <Background />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
