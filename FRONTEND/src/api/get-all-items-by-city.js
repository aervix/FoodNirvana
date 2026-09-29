import axios from "axios";
import { serverUrl } from "../App";

export const getItemByCity = async (city) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/item/get-items-by-city`,
      { city },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.log("GetItemByCity Fetch Error Found In Frontend", error);
  }
};
