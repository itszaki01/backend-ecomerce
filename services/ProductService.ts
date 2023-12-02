import { Product } from "../models/ProductModal";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { TDataRES } from "../@types/ResponseData.type";
import { ApiError } from "../utils/apiError";
import { TProductREQ } from "../@types/Product.type";
import { TQueryParams, TQuerySortParams } from "../@types/QueryParams.type";

//==========================================
/**
 *  @description Get all products
 *  @route GET /api/v1/products
 *  @access Public
 */
//==========================================
export const getAllProducts = expressAsyncHandler(async (req: TProductREQ, res, next) => {
    //1:Filters
    const queryFilters = { ...req.query } as TQueryParams;
    const querySortParams: TQuerySortParams = ["limit", "page", "sort", "fields"];
    querySortParams.forEach((key) => delete queryFilters[key]);

    //apply filtraion with [get,gt,lte,lt]
    const queryStr = JSON.stringify(queryFilters).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //2: Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    //3: Build Query
    const mongooseQuery = Product.find(JSON.parse(queryStr))
        .limit(limit)
        .skip(skip)
        .populate("brand", "name")
        .populate("category", "name")
        .populate("subcategories", "name");

    const products = await mongooseQuery;
    const totalProducts = await Product.find(JSON.parse(queryStr));

    if (products.length == 0) {
        if (page > Math.ceil(totalProducts.length / limit)) {
            return next(new ApiError("This page not exist", 404));
        } else {
            return next(new ApiError("No Products or Wrong filter", 404));
        }
    }

    const response: TDataRES = {
        results: products.length,
        page: page,
        totalResults: totalProducts.length,
        totalPages: Math.ceil(totalProducts.length / limit),
        data: products,
    };

    res.json(response);
});

//==========================================
/**
 *  @description Get specific product by :id
 *  @route GET /api/v1/products/:id
 *  @access Public
 */
//==========================================
export const getProduct = expressAsyncHandler(async (req: TProductREQ, res) => {
    const product = await Product.findById(req.params.id).populate("brand", "name").populate("category", "name").populate("subcategories", "name");
    const response: TDataRES = {
        data: product,
    };

    res.json(response);
});

//==========================================
/**
 *  @description Create new product
 *  @route POST /api/v1/products
 *  @access Private
 */
//==========================================
export const createNewProduct = expressAsyncHandler(async (req: TProductREQ, res) => {
    const body = { ...req.body, slug: slugify(req.body.title) };
    const product = await Product.create(body);
    res.status(201).json({ data: product });
});

//==========================================
/**
 *  @description Update specific product by :id
 *  @route PUT /api/v1/products/:id
 *  @access Private
 */
//==========================================
export const updateProduct = expressAsyncHandler(async (req: TProductREQ, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    const response: TDataRES = {
        data: product,
    };

    res.json(response);
});

//==========================================
/**
 *  @description Delete specific product by :id
 *  @route DELETE /api/v1/products/:id
 *  @access Private
 */
//==========================================
export const deleteProduct = expressAsyncHandler(async (req: TProductREQ, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: `Product Deleted Successfuly` });
});
