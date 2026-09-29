import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../features/shopSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { ClipLoader } from "react-spinners";

const CreateItem = () => {
  const navigator = useNavigate();

  const dispatch = useDispatch();
  //   const { userData, userState, userCity, userAddress } = useSelector(
  //     (state) => state.user
  //   );

  const catagories = [
    "Biryani",
    "Pizza",
    "Burgers",
    "Chinese",
    "Italian",
    "South Indian",
    "Healthy Meals",
    "Breakfast",
    "Street Food",
  ];
  const { myShopData } = useSelector((state) => state.shop);
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState();
  const [catagory, setCatagory] = useState();
  const [price, setPrice] = useState(0);
  const [foodType, setFoodType] = useState();
  const [frontendItemImg, setFrontendItemImg] = useState();
  const [backendItemImg, setBackendItemImg] = useState();

  const formData = new FormData();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      formData.append("itemName", itemName);
      formData.append("catagory", catagory);
      formData.append("price", price);
      formData.append("foodType", foodType);
      if (backendItemImg) {
        formData.append("itemImg", backendItemImg);
      }
      const response = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(response.data));
      setLoading(false);

      console.log("Create-Edit Shop Response: ", response.data);
      navigator("/");

      //   dispatch(setMyShopData(response.data));
    } catch (error) {
      console.log(backendItemImg);
      console.log("Item Creation Data Sending Error", error);
      setLoading(false);
    }
  };

  const handleImg = (e) => {
    const file = e.target.files[0];

    setBackendItemImg(file);
    setFrontendItemImg(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-96 mx-auto mt-6 bg-white p-4 rounded-2xl shadow-lg ">
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <FaUtensils className="text-blue-600 w-10 h-14" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-center text-blue-700 mb-2">
        Add Item
      </h2>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Item Name"
            className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
          />
        </div>

        {/* Item Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Item Image
          </label>
          <input
            type="file"
            name="itemImg"
            className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImg}
          />
        </div>

        {/* Display Item Image */}
        {frontendItemImg && (
          <div className="mt-2">
            <img
              src={frontendItemImg}
              className="w-full h-32 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Price */}

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        {/* Item catagory & Veg Type */}
        <div className="flex justify-between">
          <label>Select Category :</label>
          <select
            className="border p-1 px-2.5 outline-none"
            name="catagory"
            id=""
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          >
            <option value="">-- select catagory --</option>
            {catagories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <label>Item Type : </label>
          <select
            className="border p-1 outline-none"
            name="item-type"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
          >
            <option value="">-- select Food Type --</option>
            <option value="VEG">VEG</option>
            <option value="NON VEG">NON VEG</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
