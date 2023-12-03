import { Product } from "../models/ProductModal";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { TDataRES } from "../@types/ResponseData.type";
import { ApiError } from "../utils/apiError";
import { TProductREQ, TProductSchema } from "../@types/Product.type";
import { TQueryParams, TQuerySortParams } from "../@types/QueryParams.type";
import { ApiFeatures } from "../utils/apiFeatures";
import { deletFactory, updateFactoryHanlder } from "../helpers/handlersFactory";

//==========================================
/**
 *  @description Get all products
 *  @route GET /api/v1/products
 *  @access Public
 */
//==========================================
export const getAllProducts = expressAsyncHandler(async (req: TProductREQ, res, next) => {
    const apiFeatures = new ApiFeatures(Product, Product, req.query);

    (await (await apiFeatures.filter()).search("ByTitle")).sort().fieldsLimit().pagination();

    const products = await apiFeatures.mongooseQuery
        .populate("category", "name")
        .populate("brand", "name -_id")
        .populate("subcategories", "name -_id");

    if (products.length == 0) {
        return next(new ApiError("No data", 404));
    }

    const response = {
        results: products.length,
        ...apiFeatures.paginateResults,
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
export const updateProduct = updateFactoryHanlder(Product);

//==========================================
/**
 *  @description Delete specific product by :id
 *  @route DELETE /api/v1/products/:id
 *  @access Private
 */
//==========================================
export const deleteProduct = deletFactory(Product);
