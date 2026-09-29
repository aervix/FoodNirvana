import { serverUrl } from "../App";
import axios from "axios";

export const getShopsByCity = async (city) => {
  const response = await axios.post(
    `${serverUrl}/api/shop/get-shop-by-city`,
    { city },
    { withCredentials: true }
  );

//   console.log(response);
  return response.data;

};
