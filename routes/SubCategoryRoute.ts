import express from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "../services/SubCategoryService";
import {
    createSubCategoryValidator,
    deleteSubCategoryValidator,
    getAllSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
} from "../utils/validators/subCategoryValidators";

//===================================================================================
const router = express.Router({ mergeParams: true });

router.route("/").get(getAllSubCategoryValidator, getAllSubCategories).post(createSubCategoryValidator, createSubCategory);

router
    .route("/:id")
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);
export const SubCategoryRoute = router;
