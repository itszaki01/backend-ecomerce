import expressAsyncHandler from "express-async-handler";
import { Brand } from "../models/BrandModal";
import { ApiError } from "../utils/apiError";
import { TDataRES } from "../@types/ResponseData.type";
import slugify from "slugify";
import { TBrandREQ } from "../@types/Brand.type";

//==========================================
/**
 *  @description Get all Brands
 *  @route GET /api/v1/brands
 *  @access Public
 */
//==========================================
export const getAllBrands = expressAsyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const brands = await Brand.find().skip(skip).limit(limit);

    if (!brands || brands.length === 0) {
        return next(new ApiError(`No Brands yet`, 404));
    }

    //this just use for length
    const totalBrands = await Brand.find();

    const response: TDataRES = {
        results: brands.length,
        page: 1,
        totalResults: totalBrands.length,
        totalPages: Math.ceil(totalBrands.length / limit),
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

export const getBrand = expressAsyncHandler(async (req:TBrandREQ, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);

    const response: TDataRES = {
        data: brand,
    };

    res.json(response);
});

//==========================================
/**
 *  @description Create Brand
 *  @route POST /api/v1/brands/
 *  @access Private
 */
//==========================================

export const createBrand = expressAsyncHandler(async (req:TBrandREQ, res) => {
    const { name } = req.body;
    //1:Create
    const brand = await Brand.create({ name, slug: slugify(name) });
    //Response
    const response: TDataRES = {
        data: brand,
    };
    res.status(201).json(response);
});

//==========================================
/**
 *  @description Update Brand by ID
 *  @route PUT /api/v1/brands/:id
 *  @access Private
 */
//==========================================

export const updateBrand = expressAsyncHandler(async (req:TBrandREQ, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(id, {name,slug:slugify(name)},{new:true});

    const response: TDataRES = {
        data: brand,
    };

    res.json(response);
});

//==========================================
/**
 *  @description Delete Brand by ID
 *  @route DELETE /api/v1/brands/:id
 *  @access Private
 */
//==========================================

export const deleteBrand = expressAsyncHandler(async (req:TBrandREQ, res) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    res.json({ message: "Brand deleted successfuly" });
});
