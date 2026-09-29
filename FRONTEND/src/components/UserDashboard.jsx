import { useEffect, useState, useRef } from "react";
import CategoryCard from "./CategoryCard";
import { getAllItems } from "../api/get-all-food-items";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getShopsByCity } from "../api/get-shops-by-city";
import { getItemByCity } from "../api/get-all-items-by-city";
import ItemCard from "./ItemCard";
import { foodItems } from "../assets/categories";

const UserDashboard = () => {
  const { userCity } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [shops, setShops] = useState([]);
  const [itemsByCity, setItemsByCity] = useState([]);
  // const [city, setCity] = useState(userCity)

  // For Total Items Fetching
  useEffect(() => {
    setLoading(true);
    const fetchItem = async () => {
      const response = await getAllItems();
      // console.log(response);
      setItems(response);
    };

    fetchItem();
    setLoading(false);
  }, []);

  // For Shop Near By City Fetching
  useEffect(() => {
    setLoading(true);
    const fetchShopByCity = async () => {
      console.log(userCity);
      if (!userCity) return;

      const response = await getShopsByCity(userCity);
      console.log(response);
      setShops(response);
    };

    fetchShopByCity();
    setLoading(false);
  }, [userCity]);

  // Get All Items By City
  useEffect(() => {
    setLoading(true);

    const fetchItemByCity = async () => {
      console.log(userCity);
      if (!userCity) return;

      const response = await getItemByCity(userCity);
      console.log(response);
      setItemsByCity(response);
    };

    fetchItemByCity();
    setLoading(false);
  }, [userCity]);

  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const itemsByCityScrollRef = useRef();

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Shows All Items */}
      <div className="bg-white px-10">
        <h2 className="text-2xl sm:text-2xl font-serif text-gray-800 my-3">
          Inspiration for your first order
        </h2>

        <div className="flex justify-center relative">
          <button
            onClick={() => scrollHandler(cateScrollRef, "left")}
            className="absolute left-0 top-20"
          >
            <FaChevronCircleLeft
              size={25}
              className="cursor-pointer absolute z-10"
            />
          </button>
          <div
            ref={cateScrollRef}
            className="flex h-48 overflow-x-hidden gap-4 items-center px-2 "
          >
            {foodItems.map((food) => (
              <CategoryCard
                key={food._id}
                title={food.itemName}
                image={food.image}
              />
            ))}
          </div>
          <button onClick={() => scrollHandler(cateScrollRef, "right")}>
            <FaChevronCircleRight
              size={25}
              className="cursor-pointer z-10 absolute right-0 top-20"
            />
          </button>
        </div>
      </div>

      {/* Shops Near By City */}
      <div className="bg-white px-10">
        <h2 className="text-2xl sm:text-2xl font-serif text-gray-800 my-3">
          Shopes Near You
        </h2>
        <div className="flex  relative">
          <div className="flex  relative">
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className="absolute left-0 top-20"
            >
              <FaChevronCircleLeft
                size={25}
                className="cursor-pointer absolute z-10"
              />
            </button>
            <div
              ref={shopScrollRef}
              className="flex h-48 overflow-x-hidden gap-4 items-center px-2 "
            >
              {shops.map((shop) => (
                <CategoryCard
                  key={shop._id}
                  title={shop.shopname}
                  image={shop.image}
                />
              ))}
            </div>
            <button onClick={() => scrollHandler(shopScrollRef, "right")}>
              <FaChevronCircleRight
                size={25}
                className="cursor-pointer z-10 absolute right-0 top-20"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Items Near By City */}
      <div className="bg-white px-10 ">
        <h2 className="text-2xl sm:text-2xl font-serif text-gray-800 my-3">
          Items Near You
        </h2>
        <div className="flex relative">
          <div className="flex relative overflow-x-hidden">
            <button
              onClick={() => scrollHandler(itemsByCityScrollRef, "left")}
              className="absolute left-0 top-20"
            >
              <FaChevronCircleLeft
                size={25}
                className="cursor-pointer absolute z-10"
              />
            </button>
            <div
              ref={itemsByCityScrollRef}
              className="flex overflow-x-hidden gap-4 items-center px-2 "
            >
              {itemsByCity.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
            <button
              onClick={() => scrollHandler(itemsByCityScrollRef, "right")}
            >
              <FaChevronCircleRight
                size={25}
                className="cursor-pointer z-10 absolute right-0 top-20"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
