import express from "express";
import { SalesZodValidations } from "./sale.validation";
import { SalesControllers } from "./sale.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-sales",
  validateRequest(SalesZodValidations.createSalesValidationSchema),
  SalesControllers.createSales
);
router.get("/get-all-sales", SalesControllers.getAllSales);

export const SalesRoutes = router;