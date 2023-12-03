import express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../services/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "../utils/validators/BrandValidators";

const router = express.Router();

router.route("/").get(getAllBrands).post(createBrandValidator, createBrand);
router.route("/:id").get(getBrandValidator, getBrand).put(updateBrandValidator as any, updateBrand).delete(deleteBrandValidator, deleteBrand);

export const BrandRoute = router;
