import express from "express";
import { createNewProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../services/ProductService";
import {
    createProductValidator,
    deleteProductValidator,
    getProductValidator,
    updateProductValidator,
} from "../utils/validators/ProductValidators";


const router = express.Router();

//Product Routes

//@ts-ignore
router.route("/").get(getAllProducts).post(createProductValidator as any, createNewProduct);
router
    .route("/:id")
    .get(getProductValidator as any, getProduct)
    .put(updateProductValidator as any, updateProduct)
    .delete(deleteProductValidator as any, deleteProduct);


export const ProductRoute = router;
