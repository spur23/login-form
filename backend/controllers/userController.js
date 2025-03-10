import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import registrationValidation from "../utils/registrationValidation.js";
import generateToken from "../utils/generateToken.js";

// register new user
// POST /api/register
const userRegister = asyncHandler(async (req, res) => {
	const { nameFirst, nameLast, email, password } = req.body;

	const registrationValid = registrationValidation(
		nameFirst,
		nameLast,
		email,
		password
	);
	if (registrationValid === true) {
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400);
			throw new Error("User already exists");
		}

		const user = await User.create({
			nameFirst,
			nameLast,
			email,
			password,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				nameFirst: user.nameFirst,
				nameLast: user.nameLast,
				email: user.email,
				password: user.password,
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	}
	// } else {
	// 	res.status(40);
	// 	throw new Error(`${registrationValid} is required`);
	// }
});

// login a user
//POST /api/login
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// Checks if user exists and that the entered password matches password in database
	if (user && (await user.checkPassword(password))) {
		res.status(200).json({
			_id: user._id,
			nameFirst: user.nameFirst,
			nameLast: user.nameLast,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Incorrect email or password");
	}
});

const userGetProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			nameFirst: user.nameFirst,
			nameLast: user.nameLast,
			email: user.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const userUpdateProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.nameFirst = req.body.nameFirst || user.nameFirst;
		user.nameLast = req.body.nameLast || user.nameLast;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			nameFirst: updatedUser.nameFirst,
			nameLast: updatedUser.nameLast,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export { userRegister, userLogin, userGetProfile, userUpdateProfile };
