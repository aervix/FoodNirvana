import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoy from "../components/DeliveryBoy";
import Navbar from "../components/Navbar";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  // console.log("Home File User Data: ", userData);

  const role = userData?.role || null;
  // console.log("Home Page Role: ", role);

  return (
    <>
    <Navbar />
      <div>
        {role == "user" && <UserDashboard />}
        {role == "owner" && <OwnerDashboard />}
        {role == "deliveryBoy" && <DeliveryBoy />}
      </div>
    </>
  );
};

export default Home;
