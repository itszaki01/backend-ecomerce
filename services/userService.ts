import expressAsyncHandler from "express-async-handler";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";
import { User } from "../models/UserModal";
import bycript from "bcryptjs";
//==========================================
/**
 *  @description Get all User
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
 *  @description change password by ID
 *  @route PUT /api/v1/users/changepassword/:id
 *  @access Private
 */
//==========================================
export const changePassword = expressAsyncHandler(async (req, res, next) => {
    const { password } = req.body;
    await User.findByIdAndUpdate(req.params.id, { password: await bycript.hash(password, 12) });
    res.status(200).json({
        status: "success",
        message: "Password changed successfully",
    });
});

//==========================================
/**
 *  @description Delete Brand by ID
 *  @route DELETE /api/v1/users/:id
 *  @access Private
 */
//==========================================
export const deleteUser = deleteOne(User);
