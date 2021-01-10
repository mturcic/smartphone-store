import React, { Component } from 'react';
import data from './data.json';
import Products from './components/Products.js';
import Filter from './components/Filter';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      price: "",
      sort: ""
    };
  }
  //FILTERING PRODUCTS BY PRICE
  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === ''){
      this.setState({
        price: event.target.value, 
        products: data.products})
    } else if (event.target.value ==='200'){
    this.setState({
      price: event.target.value,
      products: data.products.filter(
        (product) => product.price < event.target.value
      )
    })
    } else if (event.target.value ==='500'){
      this.setState({
        price: event.target.value,
        products: data.products.filter(
          (product) => product.price > 200 && product.price <= event.target.value
        )
      })
    } else {
      this.setState({
        price: event.target.value,
        products: data.products.filter(
          (product) => product.price >= event.target.value
        )
      })
    }
  }
  //SORT PRODUCTS PRICE/DATE ADDED
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
            sort === "LOWEST"
            ? a.price > b.price ? 1:-1
            : sort === "HIGHEST"
            ? a.price < b.price ? 1:-1
            : a._id > b._id     ? 1:-1
        ),
    }));
  };
  render() {
    return(
    <div className="grid-container">
      <header>
        <a href="/">Smartphone store</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count={this.state.products.length}
                    price={this.state.price}
                    sort={this.state.sort}
                    filterProducts={this.filterProducts}
                    sortProducts={this.sortProducts}
            ></Filter>
            <Products products={this.state.products}></Products>
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
