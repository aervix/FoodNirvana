import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserCity, setUserState } from "../features/userSlice";
import { setAddress, setLocation } from "../features/mapSlice";
import { serverUrl } from "../App";

const UseUpdateLocation = () => {
  const { userData } = useSelector((state) => state.user);
  const GEOPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const dispatch = useDispatch();

  useEffect(() => {
    const updateLocation = async (lat, long) => {
      const response = await axios.post(
        `${serverUrl}/api/user/update-location`,
        {
          lat,
          long,
        },
        { withCredentials: true }
      );

      console.log("Update Location Response: ", response.data);
    };

    navigator.geolocation.watchPosition(async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      updateLocation(lat, long);
    });
  }, [userData]);

  return <div></div>;
};

export default UseUpdateLocation;
