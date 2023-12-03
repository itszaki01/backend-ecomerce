import express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../services/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "../utils/validators/BrandValidators";

const router = express.Router();

router.route("/").get(getAllBrands).post(createBrandValidator as any, createBrand);
router.route("/:id").get(getBrandValidator as any, getBrand).put(updateBrandValidator as any, updateBrand).delete(deleteBrandValidator as any, deleteBrand);

export const BrandRoute = router;
