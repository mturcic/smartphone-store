import { connect } from "react-redux";
import React, { Component } from "react";
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts.length + " "}Products
        </div>
        <div className="filter-sort">
          Sort:{" "}
          <select
            className="select"
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="LATEST">Latest</option>
            <option value="LOWEST">Price Ascending</option>
            <option value="HIGHEST">Price Descending</option>
          </select>
        </div>
        <div className="filter-size">
          Filter:{" "}
          <select
            className="select"
            value={this.props.price}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">All</option>
            <option value="200">Under $200</option>
            <option value="500">$200 to $500</option>
            <option value="501">Over $500</option>
          </select>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    price: state.products.price,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
