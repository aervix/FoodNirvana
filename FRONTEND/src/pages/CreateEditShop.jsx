import axios from "axios";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../features/shopSlice";
import Loader from "../components/Loader";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, userState, userCity, userAddress } = useSelector(
    (state) => state.user
  );
  const { myShopData } = useSelector((state) => state.shop);
  const [loading, setLoading] = useState(false);
  const [shopname, setshopname] = useState(myShopData?.shopname || "");
  const [city, setCity] = useState(myShopData?.city || "");
  const [state, setState] = useState(myShopData?.state || "");
  const [address, setAddress] = useState(myShopData?.address || "");
  const [frontendImg, setFrontendImg] = useState();
  const [backendImg, setBackendImg] = useState();

  const formData = new FormData();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      formData.append("shopname", shopname);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      if (backendImg) {
        formData.append("shopImg", backendImg);
      }
      const response = await axios.post(
        `${serverUrl}/api/shop/create-shop`,
        formData,
        { withCredentials: true }
      );
      // console.log("Create-Edit Shop Response: ", response.data);

      dispatch(setMyShopData(response.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("Shop Edit Data Sending Error", error);
    }
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-96 mx-auto mt-6 bg-white p-4 rounded-2xl shadow-lg ">
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <FaUtensils className="text-blue-600 w-10 h-14" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-center text-blue-700 mb-2">
        Add Shop
      </h2>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Shop Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Shop Name"
            className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setshopname(e.target.value)}
            value={shopname}
          />
        </div>

        {/* Shop Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Shop Image
          </label>
          <input
            type="file"
            name="shopImg"
            className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImg}
          />
        </div>
        {frontendImg && (
          <div className="mt-2">
            <img
              src={frontendImg}
              className="w-full h-32 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* City and State */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              placeholder="State"
              className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter Shop Address"
            className="w-full px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
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

export default CreateEditShop;
