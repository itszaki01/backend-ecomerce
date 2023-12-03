import expressAsyncHandler from "express-async-handler";
import { Brand } from "../models/BrandModal";
import { ApiError } from "../utils/apiError";
import { TDataRES } from "../@types/ResponseData.type";
import slugify from "slugify";
import { TBrandREQ } from "../@types/Brand.type";
import { ApiFeatures } from "../utils/apiFeatures";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";

//==========================================
/**
 *  @description Get all Brands
 *  @route GET /api/v1/brands
 *  @access Public
 */
//==========================================
export const getAllBrands = getAll(Brand)
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