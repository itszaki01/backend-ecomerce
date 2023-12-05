import expressAsyncHandler from "express-async-handler";
import { User } from "../models/UserModal";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import bycript from "bcryptjs";

export const signup = expressAsyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({
        data: user,
        token,
    });
});

export const login = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user) {
        return next(new ApiError("Invalid email or password", 401));
    }
    const isMatch = await bycript.compare(req.body.password, user?.password!);
    if (!isMatch) {
        return next(new ApiError("Invalid email or password", 401));
    }
    const token = jwt.sign({ userID: user?._id }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(200).json({
        data: user,
        token,
    });
});

export const auth = expressAsyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new ApiError("Please login to get access", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userID: string };
    const user = await User.findById(decoded.userID);
    if (!user) {
        return next(new ApiError("User not found", 404));
    } else if (user.role !== "admin") {
        return next(new ApiError("You are not allowed to access this route", 403));
    } else if (user.isModified("password")) {
        return next(new ApiError("Please login to get access", 401));
    }
    next();
});
