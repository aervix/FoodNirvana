import React from "react";
import { NavLink } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff8f5] px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Placed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is being prepared.
          <br />
          {/* You can track your order status in the <b>"My Orders"</b> section. */}
        </p>

        <NavLink to="/my-orders">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition duration-200">
            Back to my orders
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default OrderPlaced;
