import mongoose from "mongoose";
import { Product } from "../interface/product.interface";

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		short_description: { type: String, required: true },
		image: { type: String, required: true },
		manufacture_date: { type: String, required: true },
		category: { type: String, required: true },
	},

	{ timestamps: true }
);
export default mongoose.model("Product", ProductSchema);
