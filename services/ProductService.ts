import { Product } from "../models/ProductModal";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { TDataRES } from "../@types/ResponseData.type";
import { ApiError } from "../utils/apiError";
import { TProductREQ, TProductSchema } from "../@types/Product.type";
import { TQueryParams, TQuerySortParams } from "../@types/QueryParams.type";
import { ApiFeatures } from "../utils/apiFeatures";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../helpers/handlersFactory";
import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

// const memoryStoreage = multer.memoryStorage();

//     const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//         if (file.mimetype.startsWith("image")) {
//             cb(null, true);
//         } else {
//             //@ts-ignore
//             cb(new ApiError("Only Images allowed", 500), false);
//         }
//     };

//     //@ts-ignore
//     const upload = multer({ storage: memoryStoreage, fileFilter: imageFilter });
//     //UploadImage
//     export const uploadProductImages = upload.fields([{name:'imageCover',maxCount:1},{name:'images',maxCount:5}]);
//     export const imagesRsizer = expressAsyncHandler(async (req,res,next)=>{
//         console.log(req.files)
//     })


//==========================================
/**
 *  @description Get all products
 *  @route GET /api/v1/products
 *  @access Public
 */
//==========================================
export const getAllProducts = getAll(Product,'ByTitle')

//==========================================
/**
 *  @description Get specific product by :id
 *  @route GET /api/v1/products/:id
 *  @access Public
 */
//==========================================
export const getProduct = getOne(Product)

//==========================================
/**
 *  @description Create new product
 *  @route POST /api/v1/products
 *  @access Private
 */
//==========================================
export const createNewProduct = createOne(Product)

//==========================================
/**
 *  @description Update specific product by :id
 *  @route PUT /api/v1/products/:id
 *  @access Private
 */
//==========================================
export const updateProduct = updateOne(Product);

//==========================================
/**
 *  @description Delete specific product by :id
 *  @route DELETE /api/v1/products/:id
 *  @access Private
 */
//==========================================
export const deleteProduct = deleteOne(Product);
