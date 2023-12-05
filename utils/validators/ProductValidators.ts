import { check } from "express-validator";
import { validatorMw } from "../../middlewares/validatorMw";
import { multiSubCategoryChecker, subCategoryBelongCategoryChecker } from "../checkers/subCategoryChecker";
import { applySlugify } from "../../middlewares/applySlugify";
import { Product } from "../../models/ProductModal";
import { idChecker } from "../checkers/idChecker";
import { CategoryModal } from "../../models/CategoryModal";
import { Brand } from "../../models/BrandModal";
import * as formidable from 'formidable';
import expressAsyncHandler from "express-async-handler";

// export const parseBody = async (req, res, next) => {
//     const form = new formidable.IncomingForm();
//     const _req = req as any
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error parsing form data' });
//       }
  
//       // Combine form fields and body data into a single JSON object
//       let jsonData = {} as any
//         for (const key in fields) {
//             //@ts-ignore
//             jsonData[key] = fields[key][0]
//         }
//       req.test = jsonData
//       console.log(req.test);
      
//     });
//     next()
// }
export const createProductValidator = [
    applySlugify,
    check("title").isLength({ min: 3 }).withMessage("title must be at least 3 chars").notEmpty().withMessage("Product required"),
    check("description").notEmpty().withMessage("Product description is required").isLength({ max: 1000 }).withMessage("Too long description"),
    check("quantity").notEmpty().withMessage("Product quantity is required").isNumeric().withMessage("Product quantity must be a number"),
    check("sold").optional().isNumeric().withMessage("Product quantity must be a number"),
    check("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isNumeric()
        .withMessage("Product price must be a number")
        .isLength({ max: 32 })
        .withMessage("To long price"),
    check("priceAfterDiscount")
        .optional()
        .isNumeric()
        .withMessage("Product priceAfterDiscount must be a number")
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw new Error("priceAfterDiscount must be lower than price");
            }
            return true;
        }),
    check("colors").optional().isArray().withMessage("availableColors should be array of string"),
    check("imageCover"),
    check("images").optional().isArray().withMessage("images should be array of string"),
    check("category")
        .notEmpty()
        .withMessage("Product must be belong to a category")
        .isMongoId()
        .withMessage("Invalid ID formate")
        .custom(async (value) => {
            return await idChecker(CategoryModal, value);
        }),
    check("subcategories")
        .optional()
        .isMongoId()
        .withMessage("Invalid ID formate")
        .isArray()
        .custom(multiSubCategoryChecker)
        .custom(subCategoryBelongCategoryChecker),
    check("brand")
        .optional()
        .isMongoId()
        .withMessage("Invalid ID formate")
        .custom(async (value) => {
            return await idChecker(Brand, value);
        }),
    check("ratingsAverage")
        .optional()
        .isNumeric()
        .withMessage("ratingsAverage must be a number")
        .isLength({ min: 1 })
        .withMessage("Rating must be above or equal 1.0")
        .isLength({ max: 5 })
        .withMessage("Rating must be below or equal 5.0"),
    check("ratingsQuantity").optional().isNumeric().withMessage("ratingsQuantity must be a number"),
    validatorMw,
];

export const getProductValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid product id format")
        .custom(async (value) => {
            return await idChecker(Product, value);
        }),
    validatorMw,
];
export const updateProductValidator = [
    applySlugify,
    check("id")
        .isMongoId()
        .withMessage("Invalid product id format")
        .custom(async (value) => {
            return await idChecker(Product, value);
        }),
    validatorMw,
];
export const deleteProductValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid product id format")
        .custom(async (value) => {
            return await idChecker(Product, value);
        }),
    validatorMw,
];
