import { User } from "../models/user.models.js";

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "User Get Error" });
  }
};

const updateUserLocation = async (req, res) => {
  try {
    const { lat, long } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        type: "Point",
        coordinates: [long, lat],
      },
      { new: true }
    );

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "Location Is Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Location Update Error In Backend: ${error}` });
  }
};

export { getCurrentUser, updateUserLocation };
