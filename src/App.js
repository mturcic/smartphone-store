import React, { Component } from 'react';
import data from './data.json';
import Products from './components/Products.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    };
  }
  render() {
    return(
    <div className="grid-container">
      <header>
        <a href="/">Smartphone store</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={this.state.products}>

            </Products>
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>
        All rights reserved. 
        <a className="tag" href="https://www.github.com/mturcic" target="_blank" rel="noopener noreferrer">&nbsp; ©	mturcic</a> 
      </footer>
    </div>
    )
  }
}

export default App;
