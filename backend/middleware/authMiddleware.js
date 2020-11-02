import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authorize = asyncHandler(async (req, res, next) => {
	try {
		// split authorization on space and take second index [Bearer, token]
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			res.status(401);
			throw new Error("Not authorized, token invalid");
		} else {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decodedToken.id).select("-password");
		}
	} catch (error) {
		res.status(401);
		throw new Error("Invalid request!");
	}
	next();
});

export { authorize };
