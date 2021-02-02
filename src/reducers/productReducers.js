import {
  ALTER_PRICE,
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_PRICE,
  ORDER_PRODUCTS_BY_PRICE,
  SET_SELECTED_PRODUCT,
} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        price: action.payload.price,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    case SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case ALTER_PRICE:
      return { ...state, product: action.payload };
    default:
      return state;
  }
};
