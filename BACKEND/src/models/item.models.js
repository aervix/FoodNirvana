import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    catagory: {
      type: String,
      enum: [
        "Biryani",
        "Pizza",
        "Burgers",
        "Chinese",
        "Italian",
        "South Indian",
        "Healthy Meals",
        "Breakfast",
        "Street Food",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["VEG", "NON VEG"],
      required: true,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
