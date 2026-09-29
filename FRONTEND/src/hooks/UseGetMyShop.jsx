import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setMyShopData } from "../features/shopSlice";

const UseGetMyShop = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  // const { myShopData } = useSelector((state) => state.shop);

  useEffect(() => {
    try {
      const fetchShop = async () => {
        const response = await axios.get(`${serverUrl}/api/shop/get-shop`, {
          withCredentials: true,
        });

        console.log("My Shop Data: ", response.data);

        dispatch(setMyShopData(response.data));

        // console.log("Hooks Shop Data: ", myShopData);
      };

      fetchShop();
    } catch (error) {
      console.error("Geting Shop Data: ", error);
    }
  }, [userData]);
};

export default UseGetMyShop;
