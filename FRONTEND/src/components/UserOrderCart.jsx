import React from "react";
import { useSelector } from "react-redux";


const UserOrderCart = ({ order }) => {
  console.log("User Order Cart Orders: ", order);

  return (
    <div>
      <div className="bg-white shadow-sm rounded-2xl mb-6 p-5">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
          <div>
            <h2 className="text-gray-800 font-semibold">order: {order._id}</h2>
            <p className="text-sm text-gray-500">Date: 01 Sept 2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 font-medium">
              {order.paymentMethod}
            </p>
            <p className="text-blue-500 font-medium">{order.status}</p>
          </div>
        </div>

        {/* Multiple Shops From One Order*/}
        {order.shopOrders.map((shop, i) => (
          <div className="flex flex-col" key={i}>
            <h3 className="font-semibold text-gray-700 mb-2">
              {shop.shop.shopname}
            </h3>
            <div className="flex gap-3">
              {/* Multiple Orders From One Shop */}
              {shop.shopOrderItems.map((item, i) => (
                <div className="flex flex-col">
                  <img
                    src={item.item.image}
                    alt={item.item.itemName}
                    className="w-24 h-24 object-cover rounded-xl border"
                    key={i}
                  />
                  <p>Name: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              ))}
            </div>

            {/* Total Amount of Every Shop Which Is In Order */}
            <div className="mt-3">
              <p>Total Amount is : ₹{shop.subTotal} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrderCart;
