import express from "express";
import { checkOut } from "../controllers/checkout.controller";

const checkoutRouter = express.Router();

checkoutRouter.post("/", checkOut);

export { checkoutRouter };
