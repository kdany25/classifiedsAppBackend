import express, { Request, Response } from "express";
import Category from "../models/category";
import { BaseCategory } from "../interface/category.interface";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
	const newCategory = new Category(req.body);

	try {
		const category: BaseCategory = await newCategory.save();
		res.status(201).json(category);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		await Category.findByIdAndDelete(req.params.id as string);
		res.status(200).json("category has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	try {
		const category = await Category.findById(req.params.id as string);
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/", async (req: Request, res: Response) => {
	const query = req.query.new;
	try {
		const categories = query
			? await Category.find().sort({ _id: -1 }).limit(5)
			: await Category.find();

		res.status(200).json(categories);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	try {
		const updatedProduct = await Category.findByIdAndUpdate(
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
