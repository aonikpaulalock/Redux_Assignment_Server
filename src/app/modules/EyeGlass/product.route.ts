import express from "express";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/add-product",
  validateRequest(ProductValidation.createEyeglassesSchema),
  ProductController.createProduct
);

router.get("/get-all-products", ProductController.getAllProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.put("/update-product/:id", ProductController.updateProduct);

export const ProductRoutes = router;