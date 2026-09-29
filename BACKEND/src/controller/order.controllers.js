import { DeliveryAssignment } from "../models/deliveryAssignment.models.js";
import { Order } from "../models/order.models.js";
import { Shop } from "../models/shop.models.js";
import { User } from "../models/user.models.js";

const placeOrder = async (req, res) => {
  //   try {
  const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;
  // console.log(cartItems, paymentMethod, totalAmount, deliveryAddress);

  if (cartItems.length <= 0 || !cartItems) {
    return res.status(400).json({ message: "Cart Items Is empty" });
  }

  if (totalAmount <= 0) {
    return res.status(400).json({ message: "Total Amount Is InValid" });
  }

  if (
    !deliveryAddress.text ||
    !deliveryAddress.latitude ||
    !deliveryAddress.longitude
  ) {
    return res.status(400).json({ message: "Delivery Address Not Valid" });
  }

  // {shopId1: [item1, item2, ...], shopId2: [item1, item2, ...], shopId3: [] ....}

  const groupItemByShop = {};

  // store orders by shop
  cartItems.forEach((item) => {
    const shopId = item.shop;

    if (!groupItemByShop[shopId]) {
      groupItemByShop[shopId] = [];
    }

    groupItemByShop[shopId].push(item);
  });

  //

  const shopOrders = await Promise.all(
    Object.keys(groupItemByShop).map(async (shopId) => {
      const shop = await Shop.findOne({ _id: shopId }).populate("owner");
      // console.log(shop);

      if (!shop) {
        return res.status(404).json({ message: "Order Shop Not Found" });
      }

      const items = groupItemByShop[shopId];

      const subTotal = items.reduce((sum, item) => {
        return sum + Number(item.price) * Number(item.quantity);
      }, 0);

      return {
        shop: shop._id,
        owner: shop.owner._id,
        subTotal,
        shopOrderItems: items.map((item) => {
          return {
            item: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
        }),
      };
    })
  );

  const newOrder = await Order.create({
    user: req.userId,
    paymentMethod,
    deliveryAddress,
    totalAmount,
    shopOrders,
  });

  return res.status(200).json(newOrder);
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ message: `Place Order Error In Backend : ${error}` });
  //   }
};

const getMyOrders = async (req, res) => {
  // console.log(req.cookies.token);

  try {
    const user = await User.findById(req.userId);

    if (!user)
      return res
        .status(404)
        .json({ message: "User Not FOund For Fetching MyOrders" });

    if (user.role == "user") {
      const orders = await Order.find({ user: req.userId })
        .sort({
          createdAt: -1,
        })
        .populate("shopOrders.shop", "shopname")
        .populate("shopOrders.owner", "fullname email ")
        .populate("shopOrders.shopOrderItems.item", "itemName image price ");

      return res.status(200).json(orders);
    } else if (user.role == "owner") {
      const ownerId = req.userId;
      const orders = await Order.find({ "shopOrders.owner": ownerId })
        .sort({
          createdAt: -1,
        })
        .populate("shopOrders.shop", "shopname")
        .populate("user")
        .populate("shopOrders.shopOrderItems.item", "itemName image price ");

      const filteredOrder = orders.map((order) => ({
        _id: order._id,
        user: order.user,
        paymentMethod: order.paymentMethod,
        shopOrders: order.shopOrders.find((order) => order.owner == ownerId),
        deliveryAddress: {
          text: order.deliveryAddress.text,
          latitude: order.deliveryAddress.latitude,
          longitude: order.deliveryAddress.longitude,
        },
      }));

      return res.status(200).json(filteredOrder);
    }
  } catch (error) {
    return res.status(500).json({ message: `Get My Orders Error : ${error}` });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId, status } = req.body;

    const order = await Order.findById(orderId);
    console.log("Update Order Status: ", order);

    const shopOrder = order.shopOrders.find((order) => order.shop == shopId);
    console.log("Update ShopOrder Status: ", shopOrder);

    if (!shopOrder) {
      return res
        .status(404)
        .json({ message: "Shop Is Not Found In Shop Order" });
    }

    shopOrder.status = status;
    let deliveryBoysPayload = [];

    if (status == "Out Of Delivery" || !shopOrder.assignment) {
      const { latitude, longitude } = order.deliveryAddress;

      // deliveryBoys Models Who is Around 5Km
      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            maxDistance: 5000, // in meter 5Km
          },
        },
      });

      // All DeliveryBoys Id's Who is Near 5Km

      const nearByIds = nearByDeliveryBoys.map(
        (deliveryBoy) => deliveryBoy._id
      );

      // store all free DeliveryBoys Model who is near 5Km

      const busyIds = await DeliveryAssignment.find({
        assignedTo: {
          $in: nearByIds,
        },
        status: {
          $nin: ["brodcasted", "completed"],
        },
      }).distinct("assignedTo");

      // store all Busy DeliveryBoys Id who is near 5Km

      const busyIdSet = new Set(busyIds.map((id) => String(id)));

      // store all free DeliveryBoys Model who is near 5Km
      const availableDeliveryBoys = nearByDeliveryBoys.filter(
        (deliveryBoy) => !busyIdSet.has(String(deliveryBoy._id))
      );

      // store all free DeliveryBoys Id who is near 5Km
      const candidates = availableDeliveryBoys.map((b) => b._id);

      if (!candidates || candidates.length <= 0) {
        await order.save();
        return res.status(404).json({
          message:
            "Order Status Is Updated But There Is No DeliveryBoys Free For Delivery ",
        });
      }

      const deliveryAssignment = await DeliveryAssignment.create({
        order: order._id,
        shop: shopOrder.shop,
        shopOrderId: shopOrder._id,
        brodcastedTo: candidates,
        status: "brodcasted",
      });

      shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo;

      shopOrder.assignment = deliveryAssignment._id;
      deliveryBoysPayload = availableDeliveryBoys.map((boy) => ({
        id: boy._id,
        fullname: boy.fullname,
        longitude: boy.location.coordinates[0],
        latitude: boy.location.coordinates[1],
      }));
    }

    await shopOrder.save();
    await order.save();

    const updatedShopOrder = order.shopOrders.find(
      (order) => order.shop == shopId
    );

    await order.populate("shopOrders.shop", "name");
    await order.populate("shopOrders.assignedDeliveryBoy", "email fullname");
    await shopOrder.populate("shopOrderItems.item", "itemName image price");

    return res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
      availableBoys: deliveryBoysPayload,
      assignment: updatedShopOrder?.assignment._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Update Order Status Error: ${error}` });
  }
};

export { placeOrder, getMyOrders, updateOrderStatus };
