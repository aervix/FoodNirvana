import axios from "axios";
import { serverUrl } from "../App";

export const getAllItems = async () => {
  try {
    const items = await axios.get(`${serverUrl}/api/item/get-all-items`, {
      withCredentials: true,
    });
    // console.log("Get ALl Items", items);
    return items.data;
  } catch (error) {
    console.log("Frontend Error TO Fetch Items Data : ", error);
    return null;
  }
};
