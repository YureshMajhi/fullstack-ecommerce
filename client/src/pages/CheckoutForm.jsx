import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config";
import { saveShippingInfo } from "../reducers/cartActions";

const CheckoutForm = () => {
  const cart_items = useSelector((state) => state.cart.cart_items);
  const total = sessionStorage.getItem("total");

  const personReducer = (state, e) => {
    return { ...state, [e.target.name]: e.target.value };
  };
  const [person, setPerson] = useReducer(
    personReducer,
    localStorage.getItem("shipping_info")
      ? JSON.parse(localStorage.getItem("shipping_info"))
      : {}
  );

  const { contact_person, street, city, postal_code, state, country, phone } =
    person;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShippingInfo = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo(person));
    return navigate("/payment");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row my-2 w-full max-w-[1500px] mx-auto">
        {/* Checkout Form */}
        <form className="checkout-form flex-1 flex flex-col items-center md:items-end mr-8 gap-3">
          <h2 className="w-full max-w-md text-2xl text-[#084240]">Contact</h2>
          <input
            type="text"
            placeholder="Contact Person"
            id="contact_person"
            name="contact_person"
            onChange={setPerson}
            value={contact_person}
          />
          <input
            type="text"
            placeholder="street"
            id="street"
            name="street"
            onChange={setPerson}
            value={street}
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            name="city"
            onChange={setPerson}
            value={city}
          />
          <input
            type="text"
            placeholder="Postal Code"
            id="postal_code"
            name="postal_code"
            onChange={setPerson}
            value={postal_code}
          />
          <input
            type="text"
            placeholder="State"
            id="state"
            name="state"
            onChange={setPerson}
            value={state}
          />
          <input
            type="text"
            placeholder="Country"
            id="country"
            name="country"
            onChange={setPerson}
            value={country}
          />
          <input
            type="text"
            placeholder="Phone"
            id="phone"
            name="phone"
            onChange={setPerson}
            value={phone}
          />

          <div className="mt-5 w-full max-w-md flex justify-between">
            <Link to="/cart" className="text-blue-400 hover:text-blue-600">
              {"<"} Return to cart
            </Link>
            <button
              className="bg-blue-400 hover:bg-blue-600 p-4 rounded-md text-white"
              onClick={handleShippingInfo}
            >
              Continue to Payment
            </button>
          </div>
        </form>

        {/* Total Pricing */}
        <div className="bg-gray-200 mt-4 md:mt-0 bg-opacity-50 flex-1 p-8 border-l-gray-400 border-2 text-gray-700">
          {/* Products */}
          <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
            {cart_items.map((item, i) => {
              return (
                <div key={i} className="flex w-full max-w-sm justify-between">
                  {/* info */}
                  <div className="flex gap-2">
                    <div className="relative">
                      <img
                        src={`${API}/${item.image}`}
                        alt={item.title}
                        className="h-16 w-16 border-2 border-gray-400 rounded-md"
                      />
                      <span className="absolute scale-95 flex items-center text-xs rounded-full -top-3 -right-3 bg-[#084240] w-6 h-6 justify-center text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <p>{item.title}</p>
                  </div>

                  {/* price */}
                  <div>Rs. {item.price}</div>
                </div>
              );
            })}

            {/* Line */}
            <div className="border-[1px] border-gray-500 w-full max-w-md"></div>

            {/* Discount */}
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Discount code or gift card"
                className="border-gray-400 border-[1px] rounded-md p-2"
              />
              <button className="bg-blue-600 text-white py-3 px-5 rounded-md">
                Apply
              </button>
            </div>

            {/* Line */}
            <div className="border-[1px] border-gray-500 w-full max-w-md"></div>

            {/* Total Price */}
            <div className="flex justify-between">
              <p className="text-xl text-gray-500">Total</p>
              <p className="text-3xl text-gray-800">NPR Rs.{total}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
