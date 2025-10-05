import express from "express";
import { getProductById, getProducts } from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

export { productRouter };
