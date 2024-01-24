import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getorderdetails } from "../../api/orderApi";
import { isAuthentiated } from "../../api/userApi";
import { API } from "../../config";

const OrderDetails = () => {
  const { user } = isAuthentiated();
  const location = useLocation();
  const active = location.pathname;

  const params = useParams();
  const { id } = params;

  const [order, setOrder] = useState({});

  useEffect(() => {
    getorderdetails(id).then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setOrder(data);
        console.log(data);
      }
    });
  }, []);

  const handleOrder = () => {
    // pending -> processing -> shipping -> delivered
    if (order.status === "pending") {
      // order should go for processing
    } else if (order.status === "processing") {
      // orders should go for shipping
    } else if (order.status === "shipping") {
      // order should be delivered
    } else {
      Swal.fire("Warning", "No further processing can be done");
    }
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl underline">Order Details</h1>
        <div className="flex">
          <div className="w-1/2">
            <h2>Order ID: {order._id}</h2>
            <h2>Total Amount: {order.total}</h2>
            <h2>Order Status: {order.status}</h2>
            <h2>Order Items: </h2>
            <div className="flex flex-wrap gap-2">
              {order?.orderItems?.length > 0 &&
                order?.orderItems?.map((item) => {
                  return (
                    <div className="border-2 w-[350px] border-gray-400 rounded-md">
                      <img
                        src={`${API}/${item.product.image}`}
                        alt={`${item.product.image}`}
                        className="h-56 w-full object-contain"
                      />
                      <h2 className="text-gray-800 p-2">
                        Product: {item.product.title}
                      </h2>
                      <h2 className="text-gray-800 p-2">
                        Quantity: {item.quantity}
                      </h2>
                      <h2 className="text-gray-800 p-2">
                        Unit Price: {item.product.price}
                      </h2>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-1/2 p-5">
            <h1>Ship to: {order.contact_person}</h1>
            <h1>Street: {order.street}</h1>
            <h1>postal code: {order.postal_code}</h1>
          </div>
        </div>

        <div className="w-1/4 m-auto ">
          {user && user.role === "admin" && (
            <button className="border-2 py-1 px-2 m-1" onClick={handleOrder}>
              Process Order
            </button>
          )}

          {user && (
            <button className="border-2 py-1 px-2 m-1">Cancel Order</button>
          )}
        </div>

        <button className="mt-5 bg-green-600 p-2 text-white rounded-md hover:bg-green-400">
          <Link
            to={`${
              active === `/admin/order/${order._id}`
                ? "/admin/order"
                : "/userprofile"
            } `}
          >
            Go Back
          </Link>
        </button>
      </div>
    </>
  );
};

export default OrderDetails;
