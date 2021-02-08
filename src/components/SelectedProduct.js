import React, { Component } from "react";
import Modal from "react-modal";
import formatCurrency from "../util";
import styles from "../style/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";

class SelectedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
    };
  }
  alterPrice = (model) => {
    if (model === "128GB") {
      this.setState({ i: 1 });
    } else if (model === "256GB") {
      this.setState({ i: 2 });
    } else this.setState({ i: 0 });
  };
  render() {
    const { selectedProduct } = this.props;
    return (
      <div>
        <Modal style={styles} isOpen={true} ariaHideApp={false}>
          <FontAwesomeIcon
            className="close-modal"
            icon={faTimesCircle}
            size="2x"
            onClick={this.props.closeModal}
          />
          <div className="product-details">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div className="product-details-description">
              <p>
                <strong>{selectedProduct.title}</strong>
              </p>
              <br />
              <p>{selectedProduct.description}</p>
              <br />
              <p>
                <strong>Available Models:</strong>{" "}
                {selectedProduct.availableModels.map((model) => (
                  <span key={model}>
                    {" "}
                    <button
                      onClick={() => this.alterPrice(model)}
                      className="button"
                    >
                      {model}
                    </button>
                  </span>
                ))}
              </p>
              <br />
              <div className="product-details-price">
                From: {formatCurrency(selectedProduct.price[this.state.i])}{" "}
                <button
                  className="button"
                  onClick={() => {
                    this.props.addToCart(selectedProduct, this.state.i);
                    this.props.closeModal();
                  }}
                >
                  Add To Cart
                </button>
              </div>
              <br />
              <iframe
                title={selectedProduct.title}
                width="500"
                height="280"
                src={selectedProduct.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    selectedProduct: state.products.selectedProduct,
  }),
  {
    addToCart,
  }
)(SelectedProduct);
