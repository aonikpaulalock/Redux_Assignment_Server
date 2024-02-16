import express from "express";
import { SalesZodValidations } from "./sale.validation";
import { SalesControllers } from "./sale.controller";
import validateRequest from "../../middleware/validateRequest";

// Sales Router
const router = express.Router();

router.post(
  "/create-sales",
  validateRequest(SalesZodValidations.createSalesValidationSchema),
  SalesControllers.createSales
);

router.get("/get-all-sales/:email/:role", SalesControllers.getAllSales);

router.get("/get-sale/:id", SalesControllers.getSingleSale);

export const SalesRoutes = router;