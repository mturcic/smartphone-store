import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import Background from "./components/Background";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <img
              className="header-image"
              src="/images/header-logo.png"
              alt="header-logo"
            />
            <a href="/">The Smartphone store</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products />
              </div>
              <div className="sidebar">
                <Cart />
              </div>
              <Background />
            </div>
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
        </div>
      </Provider>
    );
  }
}
export default App;
