import { check } from "express-validator";
import { idChecker } from "../checkers/idChecker";
import { Product } from "../../models/ProductModal";
import { validatorMw } from "../../middlewares/validatorMw";
import { belongChecker } from "../checkers/belongChecker";
import { Review } from "../../models/ReviewModal";
import { uniqueChecker } from "../checkers/uniqueChecker";
import { IUser } from "../../@types/User.type";

export const createReviewValidator = [
    check("rating", "Rating is required")
        .notEmpty()
        .isNumeric()
        .withMessage("Rating must be a number")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),
    check("title", "Title is required").notEmpty().isLength({ min: 5, max: 100 }).withMessage("Title must be between 5 and 100 characters"),
    check("product", "Product is required")
        .notEmpty()
        .custom(async (value, { req }) => {
            return await idChecker(Product, value);
        }),
    check("user", "User is required").isMongoId().withMessage("Invalid user id format")
    // .custom(async (value, { req }) => {
    //     const _req = req as any;
    //     return await uniqueChecker(Review, { data:{user: value, product: _req.body.product},field:'Your review' })
    // },)
    ,
    validatorMw,
];

export const updateReviewValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid review id format")
        .custom(async (value) => {
            return await idChecker(Review, value);
        })
        .custom(async (value, { req }) => {
            const _req = req as IUser;
            const userID = _req.user._id as string;
            return await belongChecker(Review, {data:value,role:_req.user.role} , userID);
        }),
    check("rating", "Rating is required")
        .optional()
        .isNumeric()
        .withMessage("Rating must be a number")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),
    check("title", "Title is required").optional().isLength({ min: 5, max: 100 }).withMessage("Title must be between 5 and 100 characters"),
    validatorMw,
];


export const getReviewValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid review id format")
        .custom(async (value) => {
            return await idChecker(Review, value);
        }),
    validatorMw,
];

export const deleteReviewValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid review id format")
        .custom(async (value) => {
            return await idChecker(Review, value);
        })
        .custom(async (value, { req }) => {
            const _req = req as IUser;
            const userID = _req.user._id as string;
            return await belongChecker(Review, {data:value,role:_req.user.role} , userID);
        }),
    validatorMw,
];
