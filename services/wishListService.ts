import expressAsyncHandler from "express-async-handler";
import { User } from "../models/UserModal";
import { IUser } from "../@types/User.type";

//==========================================
/**
 *  @description Add Product to wishtlist
 *  @route POST /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
export const addProductToWishList = expressAsyncHandler(async (req, res) => {
    const _req = req as IUser;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await User.findByIdAndUpdate(_req.user._id, { $addToSet: { wishlist: req.body.productId } }, { new: true });
    res.json({ status: "sucess", message: "Product added succesfuly to wishlist", data: user });
});

//==========================================
/**
 *  @description Remove Product form wishtlist
 *  @route DELETE /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
export const removeProductFromWishList = expressAsyncHandler(async (req, res) => {
    const _req = req as IUser;
    //$pull user to remove data from array in mongo db
    const user = await User.findByIdAndUpdate(_req.user._id, { $pull: { wishlist: req.params.id } }, { new: true });
    res.json({ status: "sucess", message: "Product removed succesfuly from your wishlist", data: user });
});

//==========================================
/**
 *  @description get all logged user wishlsit
 *  @route GET /api/v1/wishlist
 *  @access Private/Protected
 */
//==========================================
export const getAllWishListOfLoggedUsre = expressAsyncHandler(async (req, res) => {
    const _req = req as IUser;
    //$addToSet used to push data to db array and if the same data is already exist it will not duplicate it
    const user = await User.findById(_req.user._id).populate("wishlist");
    res.json({ results: user?.wishlist.length, data: user?.wishlist });
});
