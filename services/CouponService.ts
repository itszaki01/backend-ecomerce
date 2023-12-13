import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";
import { Coupon } from "../models/CouponModal";

//==========================================
/**
 *  @description Get all Coupons
 *  @route GET /api/v1/coupons
 *  @access Public
 */
//==========================================
export const getAllCoupons = getAll(Coupon)
//==========================================
/**
 *  @description Get Coupon by ID
 *  @route GET /api/v1/coupons/:id
 *  @access Public
 */
//==========================================

export const getCoupon = getOne(Coupon)

//==========================================
/**
 *  @description Create Coupon
 *  @route POST /api/v1/coupons/
 *  @access Private
 */
//==========================================

export const createCoupon = createOne(Coupon)
//==========================================
/**
 *  @description Update Coupon by ID
 *  @route PUT /api/v1/coupons/:id
 *  @access Private
 */
//==========================================

export const updateCoupon = updateOne(Coupon)

//==========================================
/**
 *  @description Delete Coupon by ID
 *  @route DELETE /api/v1/coupons/:id
 *  @access Private
 */
//==========================================

export const deleteCoupon = deleteOne(Coupon)