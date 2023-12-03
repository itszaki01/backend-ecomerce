import { check } from "express-validator";
import { validatorMw } from "../../middlewares/validatorMw";
import { categoryChecker } from "../checkers/categoryChecker";
import { applySlugify } from "../../middlewares/applySlugify";

export const createCategoryValidator = [
    check("name")
        .notEmpty()
        .withMessage("category name is required")
        .isLength({ min: 6 })
        .withMessage("Too short category name")
        .isLength({ max: 32 })
        .withMessage("Too long category name"),
    validatorMw,
];

export const getCategoyAllSubCatigoriesValidator = [check("id").isMongoId().withMessage("Invalid category id format").custom(categoryChecker), validatorMw];
export const getCategoryValidator = [check("id").isMongoId().withMessage("Invalid category id format").custom(categoryChecker), validatorMw];
export const updateCategoryValidator = [applySlugify,check("id").isMongoId().withMessage("Invalid category id format").custom(categoryChecker), validatorMw];
export const deleteCategoryValidator = [check("id").isMongoId().withMessage("Invalid category id format").custom(categoryChecker), validatorMw];
