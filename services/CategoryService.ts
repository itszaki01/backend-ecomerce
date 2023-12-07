import { CategoryModal as Category } from "../models/CategoryModal";

import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";

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
