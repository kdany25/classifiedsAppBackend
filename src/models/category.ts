import mongoose from "mongoose";
import { Product } from "../interface/product.interface";

const CategorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},

	{ timestamps: true }
);
export default mongoose.model("Category", CategorySchema);
