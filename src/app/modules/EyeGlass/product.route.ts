import express from "express";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";
import validateRequest from "../../middleware/validateRequest";

//Product Router
const router = express.Router();

router.post(
  "/add-product",
  validateRequest(ProductValidation.createEyeglassesSchema),
  ProductController.createProduct
);

router.get("/get-all-products/:email/:role", ProductController.getAllProduct);
router.get("/get-single-product/:id", ProductController.getSingleProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.delete("/delete-products", ProductController.deleteManyProduct);
router.put("/update-product/:id", ProductController.updateProduct);

export const ProductRoutes = router;