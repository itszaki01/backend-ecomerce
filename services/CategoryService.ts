import { CategoryModal as Category } from "../models/CategoryModal";

import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";
import multer, { FileFilterCallback } from "multer";
import { ApiError } from "../utils/apiError";
import { Request } from "express";
import expressAsyncHandler from "express-async-handler";
import sharp from "sharp";
// //1: diskStoreage method
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/category");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `category-${uuidv4()}-${Date.now()}-${file.originalname}`);
//     },
// });



//==========================================
/**
 *  @description Get all categorys
 *  @route GET /api/v1/categories
 *  @access Public
 */
//==========================================
export const getAllCategories = getAll(Category);

//==========================================
/**
 *  @description Get specific category by :id
 *  @route GET /api/v1/categories/:id
 *  @access Public
 */
//==========================================
export const getCategory = getOne(Category);

//==========================================
/**
 *  @description Create new category
 *  @route POST /api/v1/categories
 *  @access Private
 */
//==========================================
export const createNewCategory = createOne(Category);
//==========================================
/**
 *  @description Update specific category by :id
 *  @route PUT /api/v1/categories/:id
 *  @access Private
 */
//==========================================
export const updateCategory = updateOne(Category);

//==========================================
/**
 *  @description Delete specific category by :id
 *  @route DELETE /api/v1/categories/:id
 *  @access Private
 */
//==========================================
export const deleteCategory = deleteOne(Category);
