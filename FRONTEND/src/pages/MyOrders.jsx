import { useSelector } from "react-redux";
import UserOrderCart from "../components/UserOrderCart";
import OwnerOrderCart from "../components/OwnerOrderCart";
import { NavLink } from "react-router-dom";

const MyOrders = () => {
  const { userData, myOrders } = useSelector((state) => state.user);
  console.log("Total Orders ", myOrders);

  return (
    <>
      <div className="bg-[#fff8f6] p-6 min-h-screen">
        <div className="max-w-3xl mx-auto ">
          {/* Header */}
          <div className="flex items-center gap-3 ">
            <NavLink to="/">
              <div className="text-xl text-gray-600 hover:text-black">←</div>
            </NavLink>
            <h1 className="text-2xl font-semibold text-gray-800">My Orders</h1>
          </div>

          <div className="md:mt-9 flex flex-col gap-5">
            {myOrders.length <= 0 && <div>No Orders Yet</div>}

            {myOrders.length > 0 && (
              <div className="flex flex-col ">
                {userData.role == "user" && (
                  <div className="">
                    {myOrders.map((order) => (
                      <UserOrderCart key={order._id} order={order} />
                    ))}
                  </div>
                )}

                {userData.role == "owner" && (
                  <div className="">
                    {myOrders.map((order) => (
                      <OwnerOrderCart key={order._id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
