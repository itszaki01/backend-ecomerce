import expressAsyncHandler from "express-async-handler";
import { TCartSchema } from "../@types/Cart.type";
import { Cart } from "../models/CartModal";
import { IUser } from "../@types/User.type";
import { Product } from "../models/ProductModal";
import { ApiError } from "../utils/apiError";
import { Coupon } from "../models/CouponModal";

export const addItemToCart = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;
    const { productId, color } = req.body;
    let cart = await Cart.findOne({ user: _req.user._id });
    const product = await Product.findById(productId);
    if (!cart) {
        cart = await Cart.create({ cartItems: [{ product: productId, color, price: product?.price }], user: _req.user._id });
    } else {
        const productIndex = cart.cartItems.findIndex((item) => item.product.toString() == productId && item.color == color);
        if (productIndex > -1) {
            cart.cartItems[productIndex].quantitiy += 1;
        } else {
            //@ts-ignore
            cart.cartItems.push({ product: productId, color, price: product.price });
        }
    }
    cart.totalCartPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantitiy, 0);
    await cart?.save();
    res.json({
        status: "sucess",
        message: "The item added succesfuly",
        data: cart,
    });
});

export const getLoggedUserItems = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;
    const cart = await Cart.findOne({ user: _req.user._id });
    if (!cart) {
        return next(new ApiError("No cart for this user", 404));
    }

    await cart.save();
    res.json({
        sattus: "success",
        results: cart?.cartItems.length,
        data: cart,
    });
});

export const removeItemFromCart = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;
    const cart = await Cart.findOneAndUpdate({ user: _req.user.id }, { $pull: { cartItems: { _id: _req.params.id } } });
    if (!cart) return next(new ApiError("no items with this id", 404));
    cart.totalCartPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantitiy, 0);
    res.status(200).json({
        sattus: "success",
        message: "Cart item removed",
        results: cart?.cartItems.length,
        data: cart,
    });
});

export const clearCartItems = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;
    const cart = await Cart.findOneAndUpdate({ user: _req.user.id }, { cartItems: [] });
    if (!cart) return next(new ApiError("no items with this id", 404));
    cart.totalCartPrice = 0;
    res.status(200).json({
        sattus: "success",
        message: "Cart Cleared",
    });
});

export const updateQuantity = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;
    const { quantity } = _req.body;
    const cart = await Cart.findOneAndUpdate({ user: _req.user.id });
    if (!cart) return next(new ApiError("no items with this id", 404));
    //@ts-ignore
    const itemIndex = cart.cartItems.findIndex((item) => item._id.toString() == req.params.id);
    if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantitiy = quantity;
    }
    cart.totalCartPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantitiy, 0);
    await cart.save();
    res.status(200).json({
        sattus: "success",
        message: "Cart Cleared",
        results: cart?.cartItems.length,
        data: cart,
    });
});

export const applyCouponToCart = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;

    const coupon = await Coupon.findOne({ name: req.body.coupon, expire: { $gt: Date.now() } });
    const cart = await Cart.findOne({ user: _req.user._id });
    if (!cart) return next(new ApiError("no items with this id", 404));
    if (!coupon) return next(new ApiError("no coupon with this id", 404));

    const rate = 0.01 * coupon.discount;
    const discountAmount = rate * cart.totalCartPrice;
    cart.totalPriceAfterDiscount = cart.totalCartPrice - discountAmount;

    await cart.save();
    res.status(200).json({
        sattus: "success",
        message: "Cart Price Updated",
        results: cart?.cartItems.length,
        data: cart,
    });
});
