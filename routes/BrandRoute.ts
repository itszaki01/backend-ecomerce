import express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../services/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "../utils/validators/BrandValidators";
import { brandChecker } from "../utils/checkers/brandChecker";

const router = express.Router();

router.route("/").get(getAllBrands).post(createBrandValidator, createBrand);
router.route("/:id").get(getBrandValidator, getBrand).put(updateBrandValidator, updateBrand).delete(deleteBrandValidator, deleteBrand);

export const BrandRoute = router;
