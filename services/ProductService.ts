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
    let mongooseQuery;
    if (!req.query.keyword) {
        mongooseQuery = Product.find(JSON.parse(queryStr))
            .limit(limit)
            .skip(skip)
            .populate("brand", "name")
            .populate("category", "name")
            .populate("subcategories", "name");
    } else {
        const keyword = req.query.keyword;
        
        const query = {
            $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }],
        };

        mongooseQuery = Product.find(query)
            .limit(limit)
            .skip(skip)
            .populate("brand", "name")
            .populate("category", "name")
            .populate("subcategories", "name");
    }

    //4:sortBy
    if (req.query.sort) {
        const sortBy = req.query.sort.replaceAll(",", " ");
        mongooseQuery.sort(sortBy);
    } else {
        mongooseQuery.sort("-createdAt");
    }

    //4:Fileds Limiting
    if (req.query.fields) {
        const fields = req.query.fields.replaceAll(",", " ");
        mongooseQuery.select(fields);
    } else {
        mongooseQuery.select("-__v");
    }

    const products = await mongooseQuery;

    if (products.length == 0) {
        return next(new ApiError("No Products or Wrong filter", 404));
    }

    const response: TDataRES = {
        results: products.length,
        page: page,
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
