import { check } from "express-validator";
import { validatorMw } from "../../middlewares/validatorMw";
import expressAsyncHandler from "express-async-handler";
import { TSubCategoryREQ } from "../../@types/SubCategory.type";
import { singleSubCategoryChecker } from "../checkers/subCategoryChecker";
import { categoryChecker } from "../checkers/categoryChecker";

const subCategoryIdPass = expressAsyncHandler((req:TSubCategoryREQ,res,next)=>{
    if(req.params.categoryID) req.body.category = req.params.categoryID
    next()
}) 


export const createSubCategoryValidator = [
    subCategoryIdPass,
    check('category').isMongoId().withMessage('Invalid Category id format').custom(categoryChecker),
    check('name','Name is required').notEmpty().isLength({min:2}).withMessage('Too Short SubCategory name'),
    validatorMw
]


export const getAllSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format').optional().custom(singleSubCategoryChecker),
    check('categoryID').isMongoId().withMessage('Invalid SubCategory id format').optional().custom(categoryChecker),
    validatorMw
]
export const getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format').custom(singleSubCategoryChecker),
    validatorMw
]

export const updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format').custom(singleSubCategoryChecker),
    check('category','SubCategory must be belong to category').notEmpty().isMongoId().withMessage('Invalid SubCategory id format').custom(categoryChecker),
    check('name','Name is required').notEmpty().isLength({min:2}).withMessage('Too Short SubCategory name'),
    validatorMw
]

export const deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format').custom(singleSubCategoryChecker),
    validatorMw
]