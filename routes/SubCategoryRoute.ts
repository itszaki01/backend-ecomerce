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
router.route("/").get(getAllSubCategoryValidator as any, getAllSubCategories).post(createSubCategoryValidator as any, createSubCategory);

router
    .route("/:id")
    .get(getSubCategoryValidator as any, getSubCategory)
    .put(updateSubCategoryValidator as any, updateSubCategory)
    .delete(deleteSubCategoryValidator as any, deleteSubCategory);
export const SubCategoryRoute = router;
