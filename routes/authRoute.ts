import express from "express";
import { login, signup } from "../services/authService";
import { logInValidator, signUpValidator } from "../utils/validators/authValidators";


const router = express.Router();

router.route("/signup").post(signUpValidator,signup)
router.route("/login").post(logInValidator,login)


export { router as authRoute };