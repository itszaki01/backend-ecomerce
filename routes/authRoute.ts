import express from "express";
import { forgotPassword, login, resetPassword, signup } from "../services/authService";
import { forgotPasswordValidator, logInValidator, resetPasswordValidator, signUpValidator } from "../utils/validators/authValidators";


const router = express.Router();

router.route("/signup").post(signUpValidator,signup)
router.route("/login").post(logInValidator,login)
router.post('/forgotPassword',forgotPasswordValidator,forgotPassword)
router.put('/resetPassword',resetPasswordValidator,resetPassword)

export { router as authRoute };