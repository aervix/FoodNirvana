import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
    ],
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Shop = mongoose.model("Shop", shopSchema);

