import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import dbConnect from "./mongo/dbConnect.js";

dotenv.config();

const app = express();

const MONGO = process.env.MONGO_CONNECTION;

const mongoConnection = MONGO.replace(
	"<password>",
	process.env.MONGO_PASSWORD
).replace("<dbname>", process.env.MONGO_DATABASE);

dbConnect(mongoConnection);

app.get("/", (req, res) => res.send("Hello!"));

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
			.cyan.bold
	)
);
