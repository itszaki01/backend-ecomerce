import { SubCategory } from "../models/SubCategoryModal";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";

//==========================================
/**
 *  @description get all SubCategory
 *  @route GET /api/v1/subcategories
 *  @nestd_route GET /api/v1/categories/:categoryID/subcategories
 *  @access Public
 */
//==========================================
export const getAllSubCategories = getAll(SubCategory)

//==========================================
/**
 *  @description Get specific SubCategory by ID
 *  @route GET /api/v1/subcategories/:id
 *  @access Public
 */
//==========================================
export const getSubCategory = getOne(SubCategory)

//==========================================
/**
 *  @description Create new SubCategory
 *  @route POST /api/v1/subcategories
 *  @access Private
 */
//==========================================
export const createSubCategory = createOne(SubCategory)

//==========================================
/**
 *  @description Update SubCategory
 *  @route PUT /api/v1/subcategories/:id
 *  @access Private
 */
//==========================================
export const updateSubCategory = updateOne(SubCategory)

//==========================================
/**
 *  @description Delete SubCategory by ID
 *  @route DELETE /api/v1/subcategories/:id
 *  @access Private
 */
//==========================================
export const deleteSubCategory = deleteOne(SubCategory)