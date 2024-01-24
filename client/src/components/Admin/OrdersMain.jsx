import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../api/orderApi";
import { Link } from "react-router-dom";

const OrdersMain = () => {
  const [orders, setOrders] = useState("");

  useEffect(() => {
    getAllOrders().then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setOrders(data);
        console.log(data);
      }
    });
  }, []);
  return (
    <>
      <div className="w-full mx-auto px-4">
        {/* Title */}
        <div className="flex justify-between my-4">
          <h2 className="text-4xl text-[#084240]">Products</h2>
        </div>

        {/* Display Products table */}
        <table className="w-full">
          <thead className="bg-gray-200 text-white text-lg">
            <tr>
              <th>S.No.</th>
              <th>Order Id</th>
              <th>Palced On</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Order Items</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.length > 0 &&
              orders.map((order, i) => {
                return (
                  <tr key={i} className="hover:bg-gray-200">
                    <td className="text-xl text-gray-700 p-2">{i + 1}</td>
                    <td className="text-xl text-gray-700 p-2">{order._id}</td>
                    <td className="text-xl text-gray-700 p-2">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )
                        : ""}
                    </td>
                    <td className="text-xl text-gray-700 p-2">{order.total}</td>
                    <td className="text-xl text-gray-700 p-2">
                      {order.status}
                    </td>
                    <td className="text-xl text-gray-700 p-2 whitespace-nowrap hover:underline">
                      <Link to={`${order._id}`}>View Details {">"}</Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersMain;
