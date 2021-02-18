import React, { Component } from "react";
import formatCurrency from "../util.js";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import styles from "../style/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.address]: e.target.value,
    });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : cartItems.length === 1 ? (
          <div className="cart cart-header">
            You have {cartItems.length} item in the cart{" "}
          </div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in the cart{" "}
          </div>
        )}
        {order && (
          <Modal
            style={styles}
            isOpen={true}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <Zoom>
              <FontAwesomeIcon
                className="close-modal"
                icon={faTimesCircle}
                size="2x"
                onClick={this.closeModal}
              />
              <div className="order-details">
                <h3 className="success-message">
                  <FontAwesomeIcon icon={faCheckSquare} />
                  &nbsp; Your order has been placed.
                </h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{order.total}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div key={x._id}>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id + item.availableModels}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="tooltip">
                      {item.title} ({item.availableModels})
                      <span className="tooltiptext">
                        The {item.availableModels} model with a price of{" "}
                        {formatCurrency(item.price)}
                      </span>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button-remove"
                          onClick={() => {
                            this.props.removeFromCart(item);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>E-mail</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <button className="button" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
