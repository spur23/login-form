import express from "express";
import {
	userRegister,
	userLogin,
	userGetProfile,
	userUpdateProfile,
} from "../controllers/userController.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.post("/login", userLogin);
router
	.route("/profile")
	.get(authorize, userGetProfile)
	.put(authorize, userUpdateProfile);

export default router;
