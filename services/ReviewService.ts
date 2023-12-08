import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";
import { Review } from "../models/ReviewModal";


//==========================================
/**
 *  @description Get All Reviews by Product :id
 *  @route GET /api/v1/products/:id/reviews
 *  @access Public
 */
//==========================================
export const getAllReviews = getAll(Review)

//==========================================
/**
 *  @description Get Review by :id
 *  @route GET /api/v1/reviews/:id
 *  @access Public
 */
//==========================================
export const getReview = getOne(Review)

//==========================================
/**
 *  @description Create Review by Product 
 *  @route POST /api/v1/reviews/
 *  @access Private/Protected/User
 */
//==========================================
export const createReview = createOne(Review,'review')

//==========================================
/**
 *  @description Update Review by :id
 *  @route PUT /api/v1/reviews/:id
 *  @access Private/Protected/User
 */
//==========================================
export const updateReview = updateOne(Review)

//==========================================
/**
 *  @description Delete Review by :id
 *  @route DELETE /api/v1/reviews/:id
 *  @access Private/Protected/User-Admin
 */
//==========================================
export const deleteReview = deleteOne(Review)