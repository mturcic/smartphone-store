import React, { Component } from "react";
import formatCurrency from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import { connect } from "react-redux";
import {
  setProduct,
  fetchProducts,
  alterPrice,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import SelectedProduct from "./SelectedProduct";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      i: 0,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = () => {
    this.setState({ product: true });
  };
  closeModal = () => {
    this.setState({ product: false });
  };

  alterPrice = (product, model) => {
    if (model === "64GB") {
      this.setState({ i: 0 });
      this.props.alterPrice(product, this.state.i);
    } else if (model === "128GB") {
      this.setState({ i: 1 });
      this.props.alterPrice(product, this.state.i);
    } else if (model === "256GB") {
      this.setState({ i: 2 });
      this.props.alterPrice(product, this.state.i);
    }
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href={"#" + product._id}>
                      <img
                        onClick={() => {
                          this.props.setProduct(product);
                          this.openModal();
                        }}
                        src={product.image}
                        alt={product.title}
                      />
                      <p className="product-title">{product.title}</p>
                      <div>
                        {product.availableModels.map((model) => (
                          <span key={model}>
                            {" "}
                            <button
                              type="submit"
                              onClick={() => {
                                this.alterPrice(product, model);
                              }}
                              className="button-list"
                            >
                              {model}
                            </button>
                          </span>
                        ))}
                      </div>
                    </a>
                    <div className="product-price">
                      {!this.props.product ? (
                        <div>from {formatCurrency(product.price[0])}</div>
                      ) : product._id === this.props.product._id ? (
                        <div>
                          from {formatCurrency(this.props.product.price)}
                        </div>
                      ) : (
                        <div>from {formatCurrency(product.price[0])}</div>
                      )}
                      <button
                        onClick={() =>
                          this.props.addToCart(product, this.state.i)
                        }
                        className="button"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        &nbsp;&nbsp;Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Flip top>
            <SelectedProduct closeModal={this.closeModal} />
          </Flip>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.filteredItems,
    product: state.products.product,
  }),
  {
    fetchProducts,
    addToCart,
    setProduct,
    alterPrice,
  }
)(Products);
