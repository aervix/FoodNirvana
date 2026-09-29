import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });

        // console.log("Fetch User Data: ", result);
        dispatch(setUserData(result.data));
        
      } catch (error) {
        console.log("User Fetching Error: ", error);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
