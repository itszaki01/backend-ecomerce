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
import { auth, allowTo } from "../services/authService";

const router = express.Router();
//Category Routes
router.route("/").get(getAllCategories).post(auth,allowTo('admin'),uploadSingleImage(),createCategoryValidator,resizeSingleImg('category'),createNewCategory);
router
    .route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(auth,allowTo('admin'),uploadSingleImage(),updateCategoryValidator,resizeSingleImg('category'), updateCategory)
    .delete(auth,allowTo('admin'),deleteCategoryValidator, deleteCategory);

//Readirect nested route to subcategries route
router.use("/:categoryID/subcategories", SubCategoryRoute);

export const CategoryRouter = router;
