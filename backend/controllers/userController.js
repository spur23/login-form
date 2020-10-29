import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import registrationValidation from "../utils/registrationValidation.js";
import generateToken from "../utils/generateToken.js";

// register new user
// POST /api/register
const userRegister = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const registrationValid = registrationValidation(name, email, password);
	if (registrationValid === true) {
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400);
			throw new Error("User already exists");
		} else {
			const user = await User.create({ name, email, password });
			if (user) {
				res.status(201).json({
					_id: user._id,
					name: user.name,
					email: user.email,
					password: user.password,
				});
			} else {
				res.status(400);
				throw new Error("Invalid user data");
			}
		}
	} else {
		res.status(40);
		throw new Error(`${registrationValid} is required`);
	}
});

const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.checkPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Incorrect email or password");
	}
});

export { userRegister, userLogin };
