import expressAsyncHandler from "express-async-handler";
import { User } from "../models/UserModal";
import { IUser } from "../@types/User.type";
import { ApiError } from "../utils/apiError";

//==========================================
/**
 *  @description Add Address
 *  @route POST /api/v1/addresses
 *  @access Private/Protected
 */
//==========================================
export const addAddress = expressAsyncHandler(async (req, res) => {
    const _req = req as IUser;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await User.findByIdAndUpdate(_req.user._id, { $addToSet: { addresses: req.body } }, { new: true });
    res.json({ status: "sucess", message: "Address added succesfuly", data: user });
});

//==========================================
/**
 *  @description Remove Product form wishtlist
 *  @route DELETE /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
export const removeAddress = expressAsyncHandler(async (req, res) => {
    const _req = req as IUser;
    //$pull user to remove data from array in mongo db
    const user = await User.findByIdAndUpdate(_req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
    res.json({ status: "sucess", message: "Address removed succesfuly", data: user });
});

//==========================================
/**
 *  @description get all logged user wishlsit
 *  @route GET /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
export const getAllAddressesOfLoggedUser = expressAsyncHandler(async (req, res, next) => {
    const _req = req as IUser;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await User.findById(_req.user._id);
    if (user?.addresses.length! < 0) {
        return next(new ApiError("No addresses yet", 400));
    }
    res.json({ results: user?.addresses.length, data: user?.addresses });
});
