import { getProduct } from "../api/productapi";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
  UPDATE_CART,
} from "./cartConstants";

export const addToCart =
  (product_id, quantity) => async (dispatch, getState) => {
    let data = await getProduct(product_id);
    let payload = {
      product: data._id,
      title: data.title,
      price: data.price,
      image: data.image,
      count_in_stock: data.count_in_stock,
      quantity,
    };

    dispatch({ type: ADD_TO_CART, payload });

    localStorage.setItem(
      "cart_items",
      JSON.stringify(getState().cart.cart_items)
    );
  };

export const removeFromCart = (product_id) => async (dispatch, getState) => {
  await dispatch({ type: REMOVE_FROM_CART, payload: product_id });

  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
};

export const emptyCart = () => async (dispatch, getState) => {
  await dispatch({ type: EMPTY_CART });

  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
};

export const updateCart = (product) => async (dispatch, getState) => {
  await dispatch({ type: UPDATE_CART, payload: product });
  localStorage.setItem(
    "cart_items",
    JSON.stringify(getState().cart.cart_items)
  );
};

export const saveShippingInfo =
  (shipping_info) => async (dispatch, getState) => {
    await dispatch({ type: SAVE_SHIPPING_INFO, payload: shipping_info });
    localStorage.setItem(
      "shipping_info",
      JSON.stringify(getState().cart.shipping_info)
    );
  };
