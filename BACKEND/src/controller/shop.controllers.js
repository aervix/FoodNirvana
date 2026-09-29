import { Shop } from "../models/shop.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createShop = async (req, res) => {
  try {
    const { shopname, city, state, address } = req.body;

    const existShop = await Shop.findOne({ owner: req.userId });

    if (existShop) {
      return res.status(400).json({ message: "Shop Is Alredy Registered" });
    }

    console.log("Shop Image req.file", req.file);

    let shopImg;
    if (req.file) {
      shopImg = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.create({
      shopname,
      city,
      state,
      address,
      image: shopImg,
      owner: req.userId,
    });

    await shop.populate("owner items");
    return res.status(200).json(shop);
  } catch (error) {
    console.log("Shop Creation Error: ", error);
    return res.status(500).json({ message: `Shop Creation Error: ${error}` });
  }
};

// const editShop = async (req, res) => {
//   try {
//     const { shopname, city, state, address } = req.body;

//     let shopImg;
//     if (req.file) {
//       shopImg = await uploadOnCloudinary(req.file.path);
//     }

//     const shop = Shop.fin

//     await shop.populate("owner");
//     return res.status(200).json(shop);
//   } catch (error) {
//     console.log("Shop Creation Error: ", error);
//     return res.status(500).json({ message: `Shop Creation Error: ${error}` });
//   }
// };

const getShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      "owner items"
    );
    if (!shop) {
      return res.status(404).json({ message: "Shop Not Found" });
      // return null;
    }

    return res.status(200).json(shop);
  } catch (error) {
    console.log("Get Shop Error: ", error);
    return res.status(500).json({ message: `Shop Getting Error ${error}` });
  }
};

const getShopsByCity = async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(404).json({ message: "Shops Not Found" });
    }

    const shops = await Shop.find({
      city: {
        $regex: new RegExp(`^${city}$`, "i"),
      },
    });

    return res.status(200).json(shops);
  } catch (error) {
    return res
      .status(404)
      .json({ message: `get Shops By City Error Found In Backend: ${error}` });
  }
};

export { createShop, getShop, getShopsByCity };
