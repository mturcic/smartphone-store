import React, { Component } from "react";
import formatCurrency from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../modal.css.js";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
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
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.image} alt={product.title} />
                      <p className="product-title">{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>from {formatCurrency(product.price)}</div>
                      <button
                        onClick={() => this.props.addToCart(product)}
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
          <Fade bottom cascade>
            <Modal
              style={styles}
              isOpen={true}
              onRequestClose={this.closeModal}
              ariaHideApp={false}
            >
              <Zoom cascade>
                <FontAwesomeIcon
                  className="close-modal"
                  icon={faTimesCircle}
                  size="2x"
                  onClick={this.closeModal}
                />
                <div className="product-details">
                  <img src={product.image} alt={product.title} />
                  <div className="product-details-description">
                    <p>
                      <strong>{product.title}</strong>
                    </p>
                    <br />
                    <p>{product.description}</p>
                    <br />
                    <p>
                      <strong>Available Models:</strong> {"  "}{" "}
                      {product.availableModels.map((x) => (
                        <span key={x.availableModel}>
                          {" "}
                          <button className="button">{x}</button>
                        </span>
                      ))}
                    </p>
                    <br />
                    <div className="product-details-price">
                      From: {formatCurrency(product.price)}{" "}
                      <button
                        className="button"
                        onClick={() => {
                          this.props.addToCart(product);
                          this.closeModal();
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                    <br />
                    <iframe
                      title={product.title}
                      width="500"
                      height="280"
                      src={product.video}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </Zoom>
            </Modal>
          </Fade>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    products: state.products.filteredItems,
  }),
  { fetchProducts }
)(Products);
