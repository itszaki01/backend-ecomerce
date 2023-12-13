import expressAsyncHandler from "express-async-handler";

import express from 'express'
import { addItemToCart, applyCouponToCart, clearCartItems, getLoggedUserItems, removeItemFromCart, updateQuantity } from "../services/CartService";
import { allowTo, auth } from "../services/authService";

const router = express.Router()
router.use(auth,allowTo('user'))
router.route('/').get(getLoggedUserItems).post(addItemToCart).put(clearCartItems)
router.put('/applyCoupon',applyCouponToCart)
router.route('/:id').put(updateQuantity).delete(removeItemFromCart)





export const cartRoute = router