import { Item } from "../models/item.models.js";
import { Shop } from "../models/shop.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createItem = async (req, res) => {
  try {
    const { itemName, catagory, price, foodType } = req.body;

    // console.log("recieving item in create-item", req.body);

    // console.log("itemImg ", req.file);

    let itemImg;
    if (req.file) {
      itemImg = await uploadOnCloudinary(req.file?.path || null);
    }

    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      return res.status(404).json({ message: "Shop Not Found" });
    }

    const item = await Item.create({
      itemName,
      image: itemImg,
      shop: shop._id,
      catagory,
      price,
      foodType,
    });

    shop.items.push(item._id);
    await shop.save();
    await shop.populate("items owner");

    return res.status(200).json(shop);
  } catch (error) {
    console.log("Item Sending Backend Error", error);
    return res.status(500).json({ message: `Create Item Error:  ${error}` });
  }
};

const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const { itemName, category, price, foodType } = req.body;

    let itemImg;
    if (req.file) {
      itemImg = await uploadOnCloudinary(req.file.path);
    }

    const newItem = await Item.findByIdAndUpdate(
      itemId,
      {
        itemName,
        category,
        price,
        image: itemImg,
        foodType,
      },
      { new: true }
    );

    // console.log(`newItem Is Here : ${newItem}`);

    if (!newItem) {
      // console.log("Item Not Found");

      return res.status(404).json("Item Not Found For Updation");
    }

    // console.log(`Item SuccessFully Updated : ${newItem}`);

    return res.status(200).json(newItem);
  } catch (error) {
    console.log("Item Edition Error : ", error);
    return res.status(500).json(`Item Updation Error : ${error}`);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = Item.findByIdAndDelete(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    // console.log(req.userId);

    const shop = await Shop.findOne({ owner: req.userId });
    console.log("Shop: ", shop);
    if (!shop) {
      return res.status(404).json({ message: "Shop Not Found" });
    }

    // console.log(itemId);
    // const temp = shop.items.filter((item) => item._id !== itemId);
    // console.log(temp);

    // const idxOfDeleteItem = shop.items.findIndex((item) => item._id == itemId)

    shop.items = shop.items.filter((item) => item._id != itemId);

    await shop.save();

    await shop.populate({
      path: "items",
      options: {
        sort: {
          updatedAt: -1,
        },
      },
    });

    return res.status(200).json(shop);
  } catch (error) {
    console.log("Item Deletion Error In Backend : ", error);

    return res.status(500).json({ message: error });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    return res.status(200).json(items);
  } catch (error) {
    console.log("Fetch Item Error In Backend ", error);

    return res.status(500).json({ message: "Fetch Items Error In Backend" });
  }
};

const getItemByCity = async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(404).json({ message: "City Not Found" });
    }

    const shops = await Shop.find({
      city: {
        $regex: new RegExp(`^${city}`, "i"),
      },
    }).populate("items");

    if (!shops) {
      return res.status(404).json({ message: "Shops Not Found" });
    }

    const shopIds = shops.map((shop) => shop._id);

    const items = await Item.find({
      shop: {
        $in: shopIds,
      },
    });

    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get Items By City Error Found In Backend: ${error}` });
  }
};

export { createItem, editItem, deleteItem, getAllItems, getItemByCity };
