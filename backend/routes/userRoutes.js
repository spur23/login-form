import express from "express";
import { userRegister, userLogin } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.post("/login", userLogin);

export default router;
