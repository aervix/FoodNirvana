import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import useGetCurrentUser from "../hooks/UseGetCurrentUser";
import UseGetCurrentCity from "../hooks/UseGetCurrentCity";
import UseGetMyShop from "../hooks/UseGetMyShop";
import CreateEditShop from "../pages/CreateEditShop";
import CreateItem from "../pages/CreateItem";
import EditItem from "../pages/EditItem";
import CartItems from "../pages/CartItems";
import CheckOut from "../pages/CheckOut";
import OrderPlaced from "../pages/OrderPlaced";
import UseGetMyOrders from "../hooks/UseGetMyOrders";
import MyOrders from "../pages/MyOrders";
import UseUpdateLocation from "../hooks/UseUpdateLocation";

const AppRoutes = () => {
  useGetCurrentUser();
  UseUpdateLocation();
  UseGetCurrentCity();
  UseGetMyShop();
  UseGetMyOrders();
  const { userData } = useSelector((state) => state.user);
  const { userCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.shop);

  // console.log("Routes User Data: ", userData);
  // console.log("Routes Shop Data: ", myShopData);
  console.log("Routes City: ", userCity);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/create-edit-shop"
        element={userData ? <CreateEditShop /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-item"
        element={userData ? <CreateItem /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={userData ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={userData ? <Navigate to="/" /> : <SignUp />}
      />
      <Route path="/logout" element={<Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/cart-items"
        element={userData ? <CartItems /> : <Navigate to="/login" />}
      />
      <Route
        path="/checkout"
        element={userData ? <CheckOut /> : <Navigate to="/login" />}
      />
      <Route
        path="/order-placed"
        element={userData ? <OrderPlaced /> : <Navigate to="/login" />}
      />
      <Route
        path="/my-orders"
        element={userData ? <MyOrders /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
