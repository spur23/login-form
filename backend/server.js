import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import dbConnect from "./mongo/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const MONGO = process.env.MONGO_CONNECTION;

const mongoConnection = MONGO.replace(
	"<password>",
	process.env.MONGO_PASSWORD
).replace("<dbname>", process.env.MONGO_DATABASE);

dbConnect(mongoConnection);

app.use(morgan("dev"));
app.use(express.json());

// user route
app.use("/api", userRoutes);

// error middleware
app.use(errorHandler);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));
	app.length("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
}

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
			.cyan.bold
	)
);
