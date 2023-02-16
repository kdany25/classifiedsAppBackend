import express, { Request, Response } from "express";
import User from "../models/auth";
import { Iuser } from "../interface/user.interface";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

//REGISTER
router.post("/register", async (req: Request, res: Response) => {
	const newUser = new User({
		firstName: req.body.firstname,
		lastName: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/login", async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});

		!user && res.status(401).json("invalid credentials");

		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC
		);

		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

		const inputPassword = req.body.password;

		originalPassword != inputPassword &&
			res.status(401).json("invalid credentials");

		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: "3d" }
		);

		const { password, ...others } = user._doc;
		res.status(200).json({ ...others, accessToken });
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
