import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/userSlice";

const ItemCard = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleCart = () => {
    // console.log("Cart Item: ", item);

    dispatch(
      addToCart({
        id: item._id,
        name: item.itemName,
        price: item.price,
        image: item.image,
        shop: item.shop,
        quantity: quantity,
        foodType: item.foodType,
      })
    );
  };

  return (
    <div className="min-w-52 rounded-xl border border-red-300 bg-white shadow-sm overflow-hidden relative md:mb-10 hover:shadow-xl transition-all duration-300">
      <img
        src={item.image}
        alt={item.title}
        className="h-28 w-full object-cover hover:scale-110 transition-all duration-300"
      />
      <span className="m-2.5 font-mono">{item.itemName}</span>
      <div className="mx-2 mt-1">
        <div className="font-medium text-lg">{item.title}</div>
        <div className="flex items-center ">
          {/* 5 stars, unfilled */}
          {[...Array(5)].map((_, idx) => (
            <svg
              key={idx}
              className="w-5 h-5 text-yellow-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          ))}
          <span className="ml-2 text-gray-500 text-sm">0</span>
        </div>
        <div className="flex items-center justify-between mt-3 mb-2">
          <div className="font-semibold ">₹{item.price}</div>

          <div className=" bg-gray-100 text-white  rounded-lg flex items-center justify-center space-x-5">

            {/* Quantity Change */}
            <div className="flex gap-2 w-9 px-2">
              <button
                className=" text-gray-700 cursor-pointer "
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className=" text-black ">{quantity}</span>

              <button
                className=" text-black cursor-pointer"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            {/* Cart Icon */}
            <button
              className="cursor-pointer  border w-full h-full px-1 bg-[#FF5533] rounded-br-lg rounded-tr-lg"
              onClick={(e) => handleCart(item)}
            >
              <TiShoppingCart className="" color="black" size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
