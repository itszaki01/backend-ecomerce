import express from "express";
import {  createNewCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../services/CategoryService";
import {
    createCategoryValidator,
    deleteCategoryValidator,
    getCategoryValidator,
    updateCategoryValidator,
} from "../utils/validators/categoryValidators";
import { SubCategoryRoute } from "./SubCategoryRoute";
import { resizeSingleImg, uploadSingleImage } from "../middlewares/uploadOneImg";

const router = express.Router();
//Category Routes
router.route("/").get(getAllCategories).post(uploadSingleImage(),createCategoryValidator,resizeSingleImg('category'),createNewCategory);
router
    .route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(uploadSingleImage(),updateCategoryValidator,resizeSingleImg('category'), updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

//Readirect nested route to subcategries route
router.use("/:categoryID/subcategories", SubCategoryRoute);

export const CategoryRouter = router;
