import expressAsyncHandler from "express-async-handler";
import { Brand } from "../models/BrandModal";
import { ApiError } from "../utils/apiError";
import { TDataRES } from "../@types/ResponseData.type";
import slugify from "slugify";
import { TBrandREQ } from "../@types/Brand.type";
import { ApiFeatures } from "../utils/apiFeatures";
import { createOne, deleteOne, getOne, updateOne } from "../helpers/handlersFactory";

//==========================================
/**
 *  @description Get all Brands
 *  @route GET /api/v1/brands
 *  @access Public
 */
//==========================================
export const getAllBrands = expressAsyncHandler(async (req: TBrandREQ, res, next) => {
    const apiFeatures = new ApiFeatures(Brand, Brand, req.query);

    (await (await apiFeatures.filter()).search()).sort().fieldsLimit().pagination();

    const brands = await apiFeatures.mongooseQuery;

    if (!brands || brands.length === 0) {
        return next(new ApiError(`No Brands yet`, 404));
    }

    //this just use for length
    const totalBrands = await Brand.find();

    const response: TDataRES = {
        results: brands.length,
        ...apiFeatures.paginateResults,
        data: brands,
    };

    res.json(response);
});

//==========================================
/**
 *  @description Get Brand by ID
 *  @route GET /api/v1/brands/:id
 *  @access Public
 */
//==========================================

export const getBrand = getOne(Brand)

//==========================================
/**
 *  @description Create Brand
 *  @route POST /api/v1/brands/
 *  @access Private
 */
//==========================================

export const createBrand = createOne(Brand)
//==========================================
/**
 *  @description Update Brand by ID
 *  @route PUT /api/v1/brands/:id
 *  @access Private
 */
//==========================================

export const updateBrand = updateOne(Brand)

//==========================================
/**
 *  @description Delete Brand by ID
 *  @route DELETE /api/v1/brands/:id
 *  @access Private
 */
//==========================================

export const deleteBrand = deleteOne(Brand)