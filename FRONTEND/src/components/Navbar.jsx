import axios from "axios";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);
  const { userCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.shop);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      alert("Logout SucessFully");
      window.location.reload();
    } catch (error) {
      console.log("Logout Error: ", error);
    }
  };

  const role = userData?.role || null;
  return (
    <>
      {role !== "owner" && (
        <>
          <nav className="flex items-center justify-between bg-blue-600 px-6 py-3 text-white shadow-md sticky top-0 z-50">
            {/* Logo */}
            <div className="text-2xl font-bold">FoodNirvana</div>

            {/* Search Bar with Location */}
            <div className="md:flex md:flex-1 items-center mx-6 hidden">
              <div className="flex items-center mr-3 text-white font-medium">
                <span className="m-1">📍</span>
                <span>{userCity}</span>
              </div>
              <div className="flex items-center bg-white rounded-full md:ml-6">
                <CiSearch color="black" className="ml-4" size="20" />
                <input
                  type="text"
                  placeholder="Search delicious food..."
                  className="w-96 px-4 py-2 rounded-full  bg-white text-black outline-none max-md:hidden font-[Open_Sans]"
                />
              </div>
            </div>

            {/* Right Side Of Navbar */}
            <div className="relative md:flex md:right-8 gap-5 justify-center items-center hidden">
              {/* Cart Icon */}
              <span className="absolute left-4 flex justify-center items-center text-sm bottom-5 bg-[#193cb8] rounded-full w-5 h-5">
                {cartItems?.length || 0}
              </span>

              <div className="flex justify-center items-center">
                <NavLink to="/cart-items">
                  <IoCartOutline size={30} />
                </NavLink>
              </div>

              {/* Orders Button */}
              <NavLink to="/my-orders">
                <button className="cursor-pointer bg-white text-blue-600 px-4 py-1.5 rounded-full  hover:bg-blue-100 text-[14px]">
                  My Orders
                </button>
              </NavLink>

              {/* Profile */}
              <div className="md:w-10 md:h-10 rounded-full bg-blue-800 flex items-center justify-center font-bold cursor-pointer ">
                {userData?.fullname.slice(0, 1)}
              </div>
              {/* Login & Logot Button */}
              <div className="flex justify-center items-center">
                {userData ? (
                  <NavLink to="/logout">
                    <button
                      className="cursor-pointer bg-white text-blue-600 md:px-4 md:py-1.5 rounded-[10px] hover:bg-blue-100 text-[14px] py-1 px-3"
                      onClick={handleLogout}
                    >
                      logout
                    </button>
                  </NavLink>
                ) : (
                  <NavLink to="/login">
                    <button className="cursor-pointer bg-white text-blue-600 md:px-4 md:py-1.5 rounded-[10px] hover:bg-blue-100 text-[14px] py-1 px-3">
                      login
                    </button>
                  </NavLink>
                )}
              </div>
            </div>

            <div className="flex flex-col md:hidden">
              <IoMenu
                className="md:hidden cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              />
            </div>
          </nav>
          <div
            className={`h-24 w-24 bg-white md:hidden border fixed right-2 top-10  text-center ${
              showMenu ? "block" : "hidden"
            } `}
          >
            <ul className="text-blue-600 space-y-2">
              <li>my order</li>
              <li>Profile</li>
              <li>logout</li>
            </ul>
          </div>
        </>
      )}

      {userData?.role == "owner" && (
        <>
          <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-blue-600">FoodNirvana</h1>

            {/* Menu */}
            <div className="flex items-center space-x-2">
              {myShopData && (
                <NavLink to="/create-item">
                  <button className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium shadow-sm cursor-pointer md:block hidden">
                    + Add Food Item
                  </button>
                </NavLink>
              )}
              {myShopData && (
                <>
                  <NavLink to="/my-orders">
                    <button className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 cursor-pointer font-medium shadow-sm ">
                      My Orders
                    </button>
                  </NavLink>
                  <span className="relative right-5 bottom-5 border px-1.5 rounded-full border-blue-600 text-white bg-blue-600">
                    0
                  </span>
                </>
              )}
              {myShopData && (
                <>
                  <button
                    className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 cursor-pointer font-medium shadow-sm relative md:right-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {userData.fullname.slice(0, 1)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
