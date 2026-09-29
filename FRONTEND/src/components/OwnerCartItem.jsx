import axios from "axios";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../features/shopSlice";

const OwnerCartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/item/delete-item`,
        { itemId },
        {
          withCredentials: true,
        }
      );

      dispatch(setMyShopData(response.data));

      console.log(response.data);
    } catch (error) {
      console.log("Item Deletaion Error: ", error);
    }
  };
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
          <span className="font-medium">Category:</span> {item.catagory}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Food Type:</span> {item.foodType}
        </p>
        <p className="text-blue-700 font-bold mt-1">${item.price}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <NavLink to={`/edit-item/${item._id}`}>
          <button className="p-2 rounded-full hover:bg-blue-100 text-blue-600">
            <FaPen />
          </button>
        </NavLink>
        <NavLink to="/">
          <button
            className="p-2 rounded-full hover:bg-red-100 text-red-600"
            onClick={() => handleDeleteItem(item._id)}
          >
            <FaTrash />
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default OwnerCartItem;
