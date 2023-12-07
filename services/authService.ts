import expressAsyncHandler from "express-async-handler";
import { User } from "../models/UserModal";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import bycript from "bcryptjs";
import { IUser } from "../@types/User.type";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";


export const signup = expressAsyncHandler(async (req, res, next) => {
    const { name, email, password, profileImg, phone, slug } = req.body;
    const user = await User.create({
        name,
        slug,
        email,
        password,
        phone,
        profileImg,
    });

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

//@ts-ignore
export const auth = expressAsyncHandler(async (req: IUser, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new ApiError("Please login to get access", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userID: string; iat: number; exp: number };
    const user = await User.findById(decoded.userID);
    if (!user) {
        return next(new ApiError("User not found", 404));
    } else if (user.passwordChangedAt.getTime() > decoded.iat * 1000) {
        return next(new ApiError("Password changed recently, please login again", 401));
    }
    req.user = user;
    next();
});

type Role = "admin" | "user";
export const allowTo = (...roles: Role[]) =>
    //@ts-ignore
    expressAsyncHandler(async (req: IUser, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError("You are not allowed to access this route", 403));
        }
        next();
});

//@ts-ignore
export const forgotPassword = expressAsyncHandler(async (req: IUser, res, next) => {
    //1. Check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ApiError("no user found with this email", 404));
    }

    //3. Send the link with token to user's email
   const resetToken = jwt.sign({ userEMAIL: req.body.email }, process.env.JWT_SECRET_KEY!, { expiresIn: '10m' });
   const message = `click on this link to reset your password reset toke = http .... /resetPassword?token=${resetToken}`
   
    try {
        await sendEmail({ to: user.email, text: message, subject: "Password reset Link" });
    } catch (error) {
        if(process.env.NODE_ENV === 'DEV'){
            const _error = error as Error;
            return next(new ApiError(`SMTP ERROR: ${_error.message}`, 500));
            
        }else{
            return next(new ApiError("Something went wrong, please try again later", 500));
        }
    }
    res.status(200).json({
        status: "success",
        message: "Password reset code sent to your email",
    });
});


export const resetPassword = expressAsyncHandler(async (req, res, next) => {
    //1. Get user based on the token
    const token = req.query.token as string;

    //when token is expired jwt.verify will throw an error automatically
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userEMAIL: string; iat: number; exp: number };
    const user = await User.findOne({ email: decoded.userEMAIL });

    if (!user) {
        return next(new ApiError("User not found", 404));
    }

    //2: check token if already used
    if (user.passwordChangedAt.getTime() > decoded.iat * 1000) {
        return next(new ApiError("Token already used", 401));
    }

    user.password = req.body.newPassword
    user.passwordChangedAt = new Date(Date.now())
    await user.save()

    res.status(200).json({
        status: "success",
        menubar: "Password reset successfully, please login again",
    });
})

