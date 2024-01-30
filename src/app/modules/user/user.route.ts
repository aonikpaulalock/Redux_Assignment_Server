import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserZodValidations } from "./user.validation";

// User Router
const router = express.Router();
router.post(
  "/create-user",
  validateRequest(UserZodValidations.createStudentValidationSchema),
  UserController.createUser
);

router.post(
  "/login-user",
  validateRequest(UserZodValidations.loginValidationSchema),
  UserController.loginUser
);

export const UserRoutes = router;