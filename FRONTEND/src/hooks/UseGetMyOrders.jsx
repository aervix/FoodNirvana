import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setMyOrders } from "../features/userSlice";

const UseGetMyOrders = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/order/my-orders`, {
          withCredentials: true,
        });

        console.log("My Orders: ", response.data);

        dispatch(setMyOrders(response.data));
      } catch (error) {
        console.log("Get My Orders Data Error In Frontend: ", error);
      }
    };

    fetchOrders();
  }, [userData]);

  return <div></div>;
};

export default UseGetMyOrders;
