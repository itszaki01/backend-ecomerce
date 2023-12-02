import { check } from "express-validator";
import { validatorMw } from "../../middlewares/validatorMw";
import { brandChecker } from "../checkers/brandChecker";

export const createBrandValidator = [
    check("name", "Name is required")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Too shoter brand name")
        .isLength({ max: 32 })
        .withMessage("Too long brand name"),
    validatorMw,
];

export const getBrandValidator = [check("id").isMongoId().withMessage("Invalid brand id format").custom(brandChecker), validatorMw];

export const updateBrandValidator = [
    check("id").isMongoId().withMessage("Invalid brand id format").custom(brandChecker),
    check("name", "Name is required")
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Too short brand name")
        .isLength({ max: 32 })
        .withMessage("Too long brand name"),
    validatorMw,
];
export const deleteBrandValidator = [check("id").isMongoId().withMessage("Invalid brand id format").custom(brandChecker), validatorMw];
