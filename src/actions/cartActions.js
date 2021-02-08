import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (product, index) => (dispatch, getState) => {
  //const cartItems = getState().cart.cartItems.slice();
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (
      x._id === product._id &&
      x.price === product.price[index] &&
      x.availableModels[0] === product.availableModels[index]
    ) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    switch (index) {
      case 0:
        product = {
          ...product,
          price: product.price[index],
          availableModels: product.availableModels.slice(0, 1),
        };
        break;
      case 1:
        product = {
          ...product,
          price: product.price[index],
          availableModels: product.availableModels.slice(1, 2),
        };
        break;
      case 2:
        product = {
          ...product,
          price: product.price[index],
          availableModels: product.availableModels.slice(2, 3),
        };
        break;
      default:
        break;
    }
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter(
      (item) =>
        item._id + item.availableModels[0] !==
        product._id + product.availableModels[0]
    );
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
