import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import Mongoose from "mongoose";
import productRouter from "./routes/product";

dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
Mongoose.connect(process.env.MONGO_URL as string)
	.then(() => console.log("DataBase connection successfull"))
	.catch((err) => {
		console.log(err);
	});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/product", productRouter);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

// Send message for default URL
app.get("/", (req, res) => res.send("Classified app testing"));
