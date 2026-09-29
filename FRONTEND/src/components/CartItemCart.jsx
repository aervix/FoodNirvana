import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteItemFromCart, updateQuantity } from "../features/userSlice";

const CartItemCart = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: quantity + 1 }));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: quantity - 1 }));
    } else {
      handleDeleteItem(item.id);
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItemFromCart(id));
  };

  // console.log(item);

  return (
    <div className="md:min-w-2xl border border-blue-300 rounded-lg shadow-md p-4 flex items-start gap-4 bg-white hover:shadow-lg transition ">
      {/* Image */}
      <img
        src={item.image}
        alt={item.itemName}
        className="w-28 h-24 object-cover rounded-md"
      />

      {/* Content */}
      <div className="flex-1">
        <h2 className="text-blue-600 font-semibold text-lg">{item.itemName}</h2>
        <p className="text-gray-600">
          <span className="font-medium">{item.name}</span>
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Food Type:</span> {item.foodType}
        </p>
        <p className="text-gray-600 font-bold mt-1">
          <span className="font-medium">Price: </span>₹{item.price}
        </p>
        <p className="text-gray-600 font-bold mt-1">
          <span className="font-medium">Total Quantity: </span>
          {item.quantity}
        </p>
        <p className="text-blue-700 font-bold mt-1">
          {" "}
          <span className="font-medium">Total Price: </span>₹
          {item.price * item.quantity}
        </p>
      </div>

      {/* Actions */}

      <div className="flex flex-col gap-2 px-5 items-center ">

        {/* Update a Quantity */}
        <div className="flex gap-4 px-2 ">
          <button
            className=" text-gray-700 cursor-pointer "
            onClick={() => {
              setQuantity((prev) => Math.max(prev - 1, 1));
              decreaseQuantity();
            }}
          >
            -
          </button>
          <span className=" text-black ">{quantity}</span>

          <button
            className=" text-black cursor-pointer"
            onClick={() => {
              setQuantity((prev) => prev + 1);
              increaseQuantity();
            }}
          >
            +
          </button>
        </div>

        {/* Delete Item */}
        <div>
          <button
            className="p-2 rounded-full hover:bg-red-100 text-red-600"
            onClick={() => handleDeleteItem(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCart;
