import React from "react";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import OwnerCartItem from "./OwnerCartItem";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.shop);
  console.log("My Shop Data : ", myShopData);

  return (
    <>
      <div>
        {/* Add Your First Shop */}
        {!myShopData && (
          <>
            <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-lg text-center mt-7">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <FaUtensils className="text-blue-600 w-14 h-14 " />
              </div>

              {/* Heading */}
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                Add Your Restaurant
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-[16px]">
                Join our food delivery platform and reach thousands of hungry
                customers every day.
              </p>

              {/* Button */}
              <NavLink to="/create-edit-shop">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer">
                  Get Started
                </button>
              </NavLink>
            </div>
          </>
        )}
      </div>

      {myShopData && (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center py-6">
          {/* Header */}
          <header className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-700 flex items-center justify-center gap-2">
              🍴 Welcome to {myShopData.shopname} Bakery
            </h1>
          </header>

          {/* Bakery Info Card */}
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl overflow-hidden">
            <div className="relative">
              <NavLink to="/create-edit-shop">
                <button className="bg-blue-600 p-2 rounded-full shadow hover:bg-blue-700 transition absolute right-3 top-2">
                  <FaPencilAlt />
                </button>
              </NavLink>
              <img
                src={myShopData.image}
                alt="Krishna Bakery"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-800">
                {myShopData.shopname}
              </h2>
              <p className="text-gray-600">
                {myShopData.city}, {myShopData.state} <br />
                {myShopData.address}
              </p>
            </div>
          </div>

          {/* Add Your First Item */}
          {myShopData.items.length === 0 && (
            <>
              <div className="max-w-80 mx-auto p-6 bg-white rounded-2xl shadow-lg text-center mt-7">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <FaUtensils className="text-blue-600 w-14 h-14 " />
                </div>

                {/* Heading */}
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  Add Your Food Items
                </h2>

                {/* Button */}
                <NavLink to="/create-item">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer">
                    Get Started
                  </button>
                </NavLink>
              </div>
            </>
          )}

          {myShopData.items.length > 0 && (
            <div className="md:mt-5 mt-2 flex-col space-y-3">
              {myShopData.items.map((item, i) => (
                
                <OwnerCartItem item={item} key={i}/>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OwnerDashboard;
