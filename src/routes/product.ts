import express, { Request, Response } from "express";
import Product from "../models/product";
import {
	BaseProduct,
	Product as ProductInterface,
} from "../interface/product.interface";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
	const newProduct = new Product(req.body);

	try {
		const note: BaseProduct = await newProduct.save();
		res.status(201).json(note);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		await Product.findByIdAndDelete(req.params.id as string);
		res.status(200).json("Product has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id as string);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/", async (req: Request, res: Response) => {
	const query = req.query.new;
	try {
		const products = query
			? await Product.find().sort({ _id: -1 }).limit(5)
			: await Product.find();

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});
export default router;
