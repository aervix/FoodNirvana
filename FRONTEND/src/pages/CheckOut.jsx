import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../features/mapSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const GEOPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  const { address, location } = useSelector((state) => state.map);

  const deliveryCharge = totalAmount > 400 ? 0 : 40;

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");

  function RecenterMap({ location }) {
    if (location.lat && location.long) {
      const map = useMap();
      map.setView([location.lat, location.long], 16, { animate: true });
    }
  }

  const onDragEnd = (e) => {
    // console.log(e.target._latlng);
    const lat = e.target._latlng.lat;
    const long = e.target._latlng.lng;
    dispatch(setLocation({ lat, long }));
    getAddressByLatLong(lat, long);
  };

  const getAddressByLatLong = async (lat, long) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${GEOPIFY_API_KEY}`
      );

      dispatch(
        setAddress(response?.data?.features[0]?.properties?.address_line2)
      );

      console.log(response?.data?.features[0]?.properties?.address_line2);
    } catch (error) {
      console.log("getAddressByLatLong Erroe: ", error);
      return null;
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      dispatch(setLocation({ lat, long }));

      await getAddressByLatLong(lat, long);
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          cartItems,
          paymentMethod,
          totalAmount,
          deliveryAddress: {
            text: address,
            latitude: location.lat,
            longitude: location.long,
          },
        },
        { withCredentials: true }
      );

      console.log(response);
      if (response.status === 200) {
        navigate("/order-placed");
      }
    } catch (error) {
      console.log("Order Data Sending Error: ", error);
    }
  };

  // if (paymentMethod === "COD") {
  // } else if (paymentMethod === "ONLINE") {
  // } else {
  //   console.log("Payment Method is Not Valid");
  // }

  // const [searchLocation, setSearchLocation] = useState(address);

  // useEffect(() => {
  //   const fetchAddress = () => {
  //     setSearchLocation(address);
  //   };

  //   fetchAddress();
  // }, [address]);

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-5 py-6 border border-gray-100 flex flex-col justify-between ">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Checkout</h2>

        {/* Delivery Location */}
        <div>
          <div className="flex items-center gap-2 font-medium text-gray-700 mb-1 text-sm">
            <FaMapMarkerAlt className="text-orange-500 text-base" />
            <span>Delivery Location</span>
          </div>
          <input
            type="text"
            value={address}
            readOnly
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-1 focus:ring-orange-400 outline-none text-gray-700 text-sm"
          />
          <div className="mt-2 h-24 rounded-lg overflow-hidden border border-gray-300">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
              {/* Map preview (leaflet) */}
              <MapContainer
                className="w-full h-full"
                center={[location?.lat, location?.long]}
                zoom={16}
              >
                <RecenterMap location={location} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[location?.lat, location?.long]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2 text-sm mt-2">
            Payment Method
          </h3>
          <div className="flex gap-3">
            {/* COD (CASH ON DELIVERY) */}
            <div
              className={`flex-1 p-3 border-2 ${
                paymentMethod === "COD"
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-200"
              }  rounded-lg cursor-pointer hover:border-blue-500  transition`}
              onClick={() => setPaymentMethod("COD")}
            >
              <div className="flex items-center gap-4">
                <FaMoneyBillWave className="text-green-600 text-base" />
                <div className="">
                  <p className="text-sm text-gray-800 leading-none">
                    Cash on Delivery
                  </p>
                  <p className="text-xs  text-gray-500 ">Pay on arrival</p>
                </div>
              </div>
            </div>

            {/* ONLINE */}

            <div
              className={`flex-1 p-3 border-2 ${
                paymentMethod === "ONLINE"
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-200"
              }  rounded-lg cursor-pointer hover:border-blue-500  transition`}
              onClick={() => setPaymentMethod("ONLINE")}
            >
              <div className="flex items-center gap-4">
                <FaMobileAlt className="text-blue-500 text-base" />
                <div>
                  <p className="text-sm text-gray-800 leading-none">
                    UPI / Card
                  </p>
                  <p className="text-xs text-gray-500 ">Pay online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg border-gray-200 mt-5">
          <div className="p-2 border-b bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-800">
              Order Summary
            </h3>
          </div>
          <div className="p-2 space-y-1 text-sm">
            {cartItems.map((item) => (
              <div className="flex justify-between text-gray-600" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              {/* <span>₹{deliveryCharge === 40 ? deliveryCharge : "Free"}</span> */}
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="border-t border-gray-300 my-1"></div>
            <div className="flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span className="text-orange-600">
                ₹{totalAmount + deliveryCharge}
              </span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          className="mt-3 w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md text-sm transition"
          onClick={handlePlaceOrder}
        >
          {paymentMethod == "COD" ? "Place Oeder" : "Pay Online"}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
