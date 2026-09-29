import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserCity, setUserState } from "../features/userSlice";
import { setAddress, setLocation } from "../features/mapSlice";

const UseGetCurrentCity = () => {
  const { userData } = useSelector((state) => state.user);
  const GEOPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCity = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${GEOPIFY_API_KEY}`
        );

        // set City
        dispatch(
          setUserCity(response?.data?.features[0]?.properties?.city || null)
        );

        // set Location
        dispatch(setLocation({ lat, long }));

        // set Full Address
        dispatch(
          setAddress(response?.data?.features[0]?.properties?.address_line2)
        );
 
        // console.log(response.data);

        // dispatch(
        //   setUserState(response?.data?.features[0]?.properties?.state || null)
        // );
        // dispatch(
        //   setUserState(response?.data?.features[0]?.properties?.address_line2 || null)
        // );

        // console.log("City Is : ", response.data.features[0].properties.city);

        // latText.innerText = lat.toFixed(2);
        // longText.innerText = long.toFixed(2);
      });
    };

    fetchCity();
  }, [userData]);

  return <div></div>;
};

export default UseGetCurrentCity;
