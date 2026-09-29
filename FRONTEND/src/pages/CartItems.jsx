import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import CartItemCart from "../components/CartItemCart";
import { setTotalAmount } from "../features/userSlice";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const discount = 0;
  const { cartItems } = useSelector((state) => state.user);
  const { totalAmount } = useSelector((state) => state.user);
  console.log("Cart Page Items: ", cartItems);

  const [items, setItems] = useState(cartItems);
  //   const [amount, setAmount] = useState(totalAmount);

  useEffect(() => {
    const addItemsIntoCart = () => {
      setItems(cartItems);
    };

    const calculateTotalAmount = () => {
      let totalAmount = 0;
      for (let i = 0; i < cartItems.length; i++) {
        totalAmount += cartItems[i].price * cartItems[i].quantity;
      }

      dispatch(setTotalAmount(totalAmount));
    };

    addItemsIntoCart();
    calculateTotalAmount();
  }, [cartItems]);

  return (
    <>
      <div className="md:min-w-2xl min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col gap-5 p-6 items-center">
        {/* Shows Cart Items Div */}
        <div className="w-full max-w-5xl bg-white border border-blue-200 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Back Button */}
          <div className="mb-6">
            <NavLink
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <span className="text-lg mr-2">
                <FaArrowLeftLong />
              </span>
              <span className="font-medium">Back to Home</span>
            </NavLink>
          </div>

          {/* Empty Cart Message */}
          {items.length === 0 && (
            <div className="flex flex-col justify-center items-center h-64 text-center">
              <h2 className="text-4xl font-semibold text-blue-700 mb-4">
                🛒 No Items In Cart
              </h2>
              <p className="text-gray-500">
                Start adding products to see them here!
              </p>
            </div>
          )}

          {/* Cart Items */}
          {items.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="text-2xl font-semibold text-gray-800 border-b border-blue-200 pb-2 mb-2">
                🛍️ Your Items
              </div>
              <div className="flext flex-col space-y-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="transform hover:scale-[1.02] transition-transform duration-300 "
                  >
                    <CartItemCart item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Total Cart Items Payment */}
        <div className="w-full max-w-5xl bg-white border border-blue-200 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🧾 Order Summary
          </h3>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">₹{totalAmount}</span>
            </div>

            <div className="flex justify-between text-base">
              <span>Discount</span>
              <span className="font-medium text-green-600">- ₹{discount}</span>
            </div>

            <div className="border-t border-blue-200 my-3"></div>

            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total (After Discount)</span>
              <span className="text-blue-700">₹{totalAmount - discount}</span>
            </div>
          </div>

          <NavLink to="/checkout">
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow transition duration-300">
              Proceed to Checkout
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CartItems;
