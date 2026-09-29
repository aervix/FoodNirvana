import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const options = {
    folder: "FoodNirvana",
  };

  try {
    // Upload the image
    const response = await cloudinary.uploader.upload(localFilePath, options);
    console.log(response);
    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error(error);
    return error;
  }
};

export { uploadOnCloudinary };
