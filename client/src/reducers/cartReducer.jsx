import { toast } from "react-toastify";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
  UPDATE_CART,
} from "./cartConstants";

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let new_product = action.payload;

      let itemsExists = state.cart_items.find(
        (item) => item.product === new_product.product
      );

      if (itemsExists) {
        toast.error(`${new_product.title} is already added to the cart.`);
        return { ...state };
      }

      toast.success(`${new_product.title} is successfully added to the cart.`);
      return { ...state, cart_items: [...state.cart_items, new_product] };
    }

    case REMOVE_FROM_CART: {
      let product = action.payload;

      return {
        ...state,
        cart_items: state.cart_items.filter((item) => item.product !== product),
      };
    }

    case EMPTY_CART: {
      return {
        ...state,
        cart_items: [],
      };
    }

    case UPDATE_CART: {
      return {
        ...state,
        cart_items: state.cart_items.map((item) =>
          item.product === action.payload.product ? action.payload : item
        ),
      };
    }

    case SAVE_SHIPPING_INFO: {
      return {
        ...state,
        shipping_info: action.payload,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
