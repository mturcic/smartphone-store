import {
  FETCH_PRODUCTS,
  SET_SELECTED_PRODUCT,
  FILTER_PRODUCTS_BY_PRICE,
  ORDER_PRODUCTS_BY_PRICE,
  ALTER_PRICE,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
  //Try catch
  const res = await fetch("/api/products");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const setProduct = (product) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_PRODUCT,
    payload: product,
  });
};

export const alterPrice = (product, index) => async (dispatch) => {
  const price = product.price[index];
  console.log(price);
  product = { ...product, price: price };

  console.log(product);
  dispatch({
    type: ALTER_PRICE,
    payload: product,
  });
};

export const filterProducts = (products, price) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_PRICE,
    payload: {
      price: price,
      items:
        price === ""
          ? products
          : price === "200"
          ? products.filter((products) => products.price < price)
          : price === "500"
          ? products.filter(
              (products) => products.price > 200 && products.price <= price
            )
          : products.filter((products) => products.price >= price),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "LATEST") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "LOWEST"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
