import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ProductRoutes } from "../modules/EyeGlass/product.route";
import { SalesRoutes } from "../modules/Sale/sale.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/sales",
    route: SalesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;