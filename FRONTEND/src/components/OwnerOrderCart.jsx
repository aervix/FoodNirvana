import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import uniqid from "uniqid"
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../features/userSlice";

const OwnerOrderCart = ({ order }) => {
  const [availableBoys, setAvailableBoys] = useState([]);

  const dispatch = useDispatch();
  //   const [orderStatus, setOrderStatus] = useState("Pending");
  console.log("Owner Order Cart Details: ", order);

  const handleStatusUpdate = async (orderId, shopId, status) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/order/update-order-status`,
        {
          orderId,
          status,
          shopId,
        },
        { withcredentials: true }
      );

      console.log(response.data);
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(response.data.availableBoys);
    } catch (error) {
      console.error(`handleUpdateStatus Frontend Error: `, error);
    }
  };

  return (
    <>
      <div className="bg-[#fff8f6] p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-6">
          {/* User Info */}
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              {order.user.fullname}
            </h2>
            <p className="text-gray-600 text-sm">{order.user.email}</p>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <span className="mr-1">📞</span>
              <span>5641519654</span>
            </div>
            <p className="text-gray-700 text-sm mt-2">
              {order?.deliveryAddress?.text || " "}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Lat: {order.deliveryAddress.latitude} , Lon:{" "}
              {order.deliveryAddress.longitude}
            </p>
          </div>
          <div className="flex gap-4">
            {/* Order Item */}
            {order.shopOrders.shopOrderItems.map((item) => (
              <div className="flex flex-col w-28 h-36 mb-1" key={uniqid()}>
                <div className="block overflow-hidden">
                  <img
                    src={item.item.image}
                    alt={item.itemName}
                    className="w-28 h-20 object-cover hover:scale-125 duration-300 transition-all"
                  />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium text-center">
                    {item.item.itemName}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Quantity: {item.quantity} x ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center ">
            <p className="text-gray-700">
              Status:{" "}
              <span className="text-red-500 font-semibold">
                {order.shopOrders.status}
              </span>
            </p>
            <div className="flex items-center gap-4">
              <select
                className="border outline-none rounded-lg px-3 py-1 text-sm "
                onChange={(e) =>
                  handleStatusUpdate(
                    order._id,
                    order.shopOrders.shop._id,
                    e.target.value
                  )
                }
              >
                <option value="">Change</option>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Prepering">Prepering</option>
                <option value="Out Of Delivery">Out Of Delivery</option>
              </select>

              {order.shopOrders.status == "Out Of Delivery" && (
                <div className="mt-3 p-2 rounded-lg text-sm bg-orange-50">
                  <p>Available Delivery Boys: </p>
                  {availableBoys.length > 0 ? (
                    <div>
                      {availableBoys.map((boy) => (
                        <div key={uniqid()}>{boy.fullname}</div>
                      ))}
                    </div>
                  ) : (
                    <div>No Available DeliveryBoys</div>
                  )}
                </div>
              )}
              <p className="text-gray-800 font-semibold">
                Total: ₹{order.shopOrders.subTotal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerOrderCart;
