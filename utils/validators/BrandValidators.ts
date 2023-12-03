import { check } from "express-validator";
import { validatorMw } from "../../middlewares/validatorMw";
import { applySlugify } from "../../middlewares/applySlugify";
import { Brand } from "../../models/BrandModal";
import { idChecker } from "../checkers/idChecker";

export const createBrandValidator = [
    applySlugify,
    check("name", "Name is required")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Too shoter brand name")
        .isLength({ max: 32 })
        .withMessage("Too long brand name"),
    validatorMw,
];

export const getBrandValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid brand id format")
        .custom(async (value) => {
            return await idChecker(Brand, value);
        }),
    validatorMw,
];

export const updateBrandValidator = [
    applySlugify,
    check("id")
        .isMongoId()
        .withMessage("Invalid brand id format")
        .custom(async (value) => {
            return await idChecker(Brand, value);
        }),
    check("name", "Name is required")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Too short brand name")
        .isLength({ max: 32 })
        .withMessage("Too long brand name"),
    validatorMw,
];
export const deleteBrandValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid brand id format")
        .custom(async (value) => {
            return await idChecker(Brand, value);
        }),
    validatorMw,
];
