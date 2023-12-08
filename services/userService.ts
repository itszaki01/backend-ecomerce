import expressAsyncHandler from "express-async-handler";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";
import { User } from "../models/UserModal";
import bycript from "bcryptjs";
import { IUser } from "../@types/User.type";
//==========================================
/**
 *  @description Get all Users
 *  @route GET /api/v1/user
 *  @access Private
 */
//==========================================
export const getAllUsers = getAll(User);

//==========================================
/**
 *  @description Get User by ID
 *  @route GET /api/v1/users/:id
 *  @access Private
 */
//==========================================
export const getUser = getOne(User);

//==========================================
/**
 *  @description Create User
 *  @route POST /api/v1/users/
 *  @access Private
 */
//==========================================
export const createUser = createOne(User);

//==========================================
/**
 *  @description Update User by ID
 *  @route PUT /api/v1/users/:id
 *  @access Private
 */
//==========================================
export const updateUser = updateOne(User);

//==========================================
/**
 *  @description change password by userID
 *  @route PUT /api/v1/users/changepassword/:id
 *  @access Private
 */
//==========================================
export const changePassword = expressAsyncHandler(async (req, res, next) => {
    const { password } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        password: await bycript.hash(password, 12),
        passwordChangedAt: Date.now(),
    });
    res.status(200).json({
        status: "success",
        message: "Password changed successfully",
    });
});

//==========================================
/**
 *  @description Delete User by ID
 *  @route DELETE /api/v1/users/:id
 *  @access Private
 */
//==========================================
export const deleteUser = deleteOne(User);

//==========================================
/**
 *  @description Get Logged User Data
 *  @route GET /api/v1/users/getMe
 *  @access Private/Protected
 */
//==========================================
// @ts-ignore
export const getLoggedUserData = expressAsyncHandler(async (req: IUser, res, next) => {
    req.params.id = req.user._id;
    next();
});

//==========================================
/**
 *  @description Update Logged User Password
 *  @route GET /api/v1/users/changeMyPasswrod/:id
 *  @access Private/Protected
 */
//==========================================
// @ts-ignore
export const updateLoggedUserPassword = expressAsyncHandler(async (req: IUser, res, next) => {
    const { password } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
        password: await bycript.hash(password, 12),
        passwordChangedAt: Date.now(),
    });
    res.status(200).json({
        status: "success",
        message: "Password changed successfully",
    });
});

//==========================================
/**
 *  @description Update Logged User Profile
 *  @route PUT /api/v1/users/updateProfile/:id
 *  @access Private/Protected
 */
//==========================================
// @ts-ignore
export const updateLoggedUserProfile = expressAsyncHandler(async (req, res, next) => {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        slug: req.body.slug,
    };
    req.body = payload;
    //@ts-ignore
    req.params.id = req.user._id;
    console.log(req.body);

    next();
});
