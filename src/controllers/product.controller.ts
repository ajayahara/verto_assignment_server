import { Request, Response } from "express";
import { products } from "../utils/products";

export const getProducts = (req: Request, res: Response): void => {
  try {
    res.json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getProductById = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    const product = products.filter((item) => item.id == id)[0];
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
