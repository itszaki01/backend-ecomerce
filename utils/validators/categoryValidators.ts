import { check } from "express-validator";
import { validatorMw } from "../../middlewares/validatorMw";
import { categoryChecker } from "../checkers/categoryChecker";
import { applySlugify } from "../../middlewares/applySlugify";
import { idChecker } from "../checkers/idChecker";
import { CategoryModal as Category } from "../../models/CategoryModal";

export const createCategoryValidator = [
    applySlugify,
    check("name")
        .notEmpty()
        .withMessage("category name is required")
        .isLength({ min: 6 })
        .withMessage("Too short category name")
        .isLength({ max: 32 })
        .withMessage("Too long category name"),
    validatorMw,
];

export const getCategoyAllSubCatigoriesValidator = [check("id").isMongoId().withMessage("Invalid category id format").custom(async (value)=>{
    return await idChecker(Category,value)
}), validatorMw];
export const getCategoryValidator = [check("id").isMongoId().withMessage("Invalid category id format").custom(async (value)=>{
    return await idChecker(Category,value)
}), validatorMw];
export const updateCategoryValidator = [applySlugify,check("id").isMongoId().withMessage("Invalid category id format").custom(async (value)=>{
    return await idChecker(Category,value)
}), validatorMw];
export const deleteCategoryValidator = [check("id").isMongoId().withMessage("Invalid category id format").custom(async (value)=>{
    return await idChecker(Category,value)
}), validatorMw];
