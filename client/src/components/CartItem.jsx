import React from "react";
import { BsTrash } from "react-icons/bs";
import { API } from "../config";
import { useDispatch } from "react-redux";
import { updateCart } from "../reducers/cartActions";
import { toast } from "react-toastify";

const CartItem = ({ item, deleteItem }) => {
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    let quantity = item.quantity + 1;
    if (quantity > item.count_in_stock) {
      toast.error(`${item.title} reached maximum stock`);
    } else {
      let updatedProduct = { ...item, quantity: quantity };
      dispatch(updateCart(updatedProduct));
    }
  };

  const handleDecrement = (item) => {
    let quantity = item.quantity;
    if (quantity > 1) {
      quantity--;
      let updatedProduct = { ...item, quantity: quantity-- };
      dispatch(updateCart(updatedProduct));
    }
  };
  return (
    <>
      <div className="flex justify-between md:items-center my-4">
        {/* Info */}
        <div className="flex justify-between gap-4">
          <div>
            {" "}
            <img
              src={`${API}/${item.image}`}
              alt={item.title}
              className="h-32 w-32 md:h-20 md:w-20 object-contain mr-[50px]"
            />
          </div>
          <div className="md:flex items-center">
            <div>
              <p className="w-52 md:mr-10">
                {item.title.length > 20
                  ? item.title.slice(0, 20) + "..."
                  : item.title}
              </p>
              <p className="my-2 font-light">Rs. {item.price}</p>
            </div>
            <div className="flex">
              <div className="flex border-2 border-gray-700 text-gray-700 w-[120px] md:w-[150px] h-[40px] md:h-[50px] justify-around p-2">
                <button onClick={() => handleDecrement(item)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button
                onClick={() => deleteItem(item.product)}
                className="ml-5 scale-125 md:scale-100 hover:scale-125 duration-150"
              >
                <BsTrash />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 text-gray-700">
          Rs. {(item.price * item.quantity).toFixed(2)}{" "}
        </div>
      </div>
    </>
  );
};

export default CartItem;
