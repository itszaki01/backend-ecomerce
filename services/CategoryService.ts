import { TCategoryREQ } from "../@types/Categorys.type";
import { CategoryModal as Category } from "../models/CategoryModal";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { TDataRES } from "../@types/ResponseData.type";
import { ApiError } from "../utils/apiError";
import { ApiFeatures } from "../utils/apiFeatures";
import { deletFactory, updateFactoryHanlder } from "../helpers/handlersFactory";

//==========================================
/**
 *  @description Get all categorys
 *  @route GET /api/v1/categories
 *  @access Public
 */
//==========================================
export const getAllCategories = expressAsyncHandler(async (req: TCategoryREQ, res, next) => {
    const apiFeatures = new ApiFeatures(Category, Category, req.query);

    (await (await apiFeatures.filter()).search()).sort().fieldsLimit().pagination();

    const categories = await apiFeatures.mongooseQuery;
    
    if (categories.length == 0) {
        return next(new ApiError("No Categories yet", 404));
    }
    
    const response: TDataRES = {
        results: categories.length,
        ...apiFeatures.paginateResults,
        data: categories,
    };

    res.json(response);
});



//==========================================
/**
 *  @description Get specific category by :id
 *  @route GET /api/v1/categories/:id
 *  @access Public
 */
//==========================================
export const getCategory = expressAsyncHandler(async (req: TCategoryREQ, res, next) => {
    const category = await Category.findById(req.params.id);
    const response: TDataRES = {
        data: category,
    };

    res.json(response);
});

//==========================================
/**
 *  @description Create new category
 *  @route POST /api/v1/categories
 *  @access Private
 */
//==========================================
export const createNewCategory = expressAsyncHandler(async (req: TCategoryREQ, res) => {
    const { name } = req.body;
    const catigory = await Category.create({ name, slug: slugify(name) });
    res.status(201).json({ data: catigory });
});

//==========================================
/**
 *  @description Update specific category by :id
 *  @route PUT /api/v1/categories/:id
 *  @access Private
 */
//==========================================
export const updateCategory = updateFactoryHanlder(Category)

//==========================================
/**
 *  @description Delete specific category by :id
 *  @route DELETE /api/v1/categories/:id
 *  @access Private
 */
//==========================================
export const deleteCategory = deletFactory(Category)
