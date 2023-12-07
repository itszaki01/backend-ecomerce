import express from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "../services/SubCategoryService";
import {
    createSubCategoryValidator,
    deleteSubCategoryValidator,
    getAllSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
} from "../utils/validators/subCategoryValidators";
import { filterObj } from "../middlewares/filterObjMw";
import { auth, allowTo } from "../services/authService";

//===================================================================================
const router = express.Router({ mergeParams: true });
router.route("/").get(getAllSubCategoryValidator,filterObj, getAllSubCategories).post(auth,allowTo('admin'),createSubCategoryValidator, createSubCategory);

router
    .route("/:id")
    .get(getSubCategoryValidator, getSubCategory)
    .put(auth,allowTo('admin'),updateSubCategoryValidator, updateSubCategory)
    .delete(auth,allowTo('admin'),deleteSubCategoryValidator, deleteSubCategory);
export const SubCategoryRoute = router;
