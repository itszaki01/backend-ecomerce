import expressAsyncHandler from "express-async-handler";
import { SubCategory } from "../models/SubCategoryModal";
import { TSubCategoryREQ } from "../@types/SubCategory.type";
import slugify from "slugify";
import { TDataRES } from "../@types/ResponseData.type";
import { CategoryModal as Category } from "../models/CategoryModal";
import { ApiError } from "../utils/apiError";
import mongoose from "mongoose";

//==========================================
/**
 *  @description get all SubCategory
 *  @route GET /api/v1/subcategories
 *  @nestd_route GET /api/v1/categories/:categoryID/subcategories
 *  @access Public
 */
//==========================================
export const getAllSubCategories = expressAsyncHandler(async (req: TSubCategoryREQ, res, next) => {
    const { id } = req.params;
    let filterObject = {};

    if (id) {
        filterObject = { category: id };
    }

    //2: Get all SubCategory
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const subCategories = await SubCategory.find(filterObject).skip(skip).limit(limit).populate("category", "name");
    
    if (!subCategories || subCategories.length === 0) {
        return next(new ApiError(`No SubCategoies yet`, 404));
    }

    //this just use for length
    const totalSubCategories = await SubCategory.find(filterObject);

    const response: TDataRES = {
        results: subCategories.length,
        page: 1,
        totalResults: totalSubCategories.length,
        totalPages: Math.ceil(totalSubCategories.length / limit),
        data: subCategories,
    };

    res.json(response);
});




//==========================================
/**
 *  @description Get specific SubCategory by ID
 *  @route GET /api/v1/subcategories/:id
 *  @access Public
 */
//==========================================
export const getSubCategory = expressAsyncHandler(async (req: TSubCategoryREQ, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id).populate("category", "name");

    const response: TDataRES = {
        data: subCategory,
    };

    res.json(response);
});




//==========================================
/**
 *  @description Create new SubCategory
 *  @route POST /api/v1/subcategories
 *  @access Private
 */
//==========================================
export const createSubCategory = expressAsyncHandler(async (req: TSubCategoryREQ, res, next) => {
    const { name, category } = req.body;
    //1:check if category is exist
    const checkCategory = await Category.findById(category);
    if (!checkCategory) {
        return next(new ApiError(`No Category for this id ${category}`, 404));
    }

    //2:Create
    const subCategory = await SubCategory.create({ name, category, slug: slugify(name) });

    //Response
    const response: TDataRES = {
        data: subCategory,
    };

    res.status(201).json(response);
});




//==========================================
/**
 *  @description Create new SubCategory
 *  @route PUT /api/v1/subcategories/:id
 *  @access Private
 */
//==========================================
export const updateSubCategory = expressAsyncHandler(async (req: TSubCategoryREQ, res, next) => {
    const { name, category } = req.body;
    const { id } = req.params;
    //1:check if category is exist
    const checkCategory = await Category.findById(category);
    if (!checkCategory) {
        return next(new ApiError(`No Category for this id ${category}`, 404));
    }

    //2:Create
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, { name, category, slug: slugify(name) }, { new: true }).populate(
        "category",
        "name slug -_id"
    );

    //Response
    const response: TDataRES = {
        data: updatedSubCategory,
    };

    res.status(201).json(response);
});





//==========================================
/**
 *  @description Delete SubCategory by ID
 *  @route DELETE /api/v1/subcategories/:id
 *  @access Private
 */
//==========================================
export const deleteSubCategory = expressAsyncHandler(async (req: TSubCategoryREQ, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
        return next(new ApiError(`No SubCategory for this id ${id}`, 404));
    }

    res.json({ message: `SubCategory deleted successfuly` });
});
