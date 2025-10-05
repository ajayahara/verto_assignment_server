import { Request, Response } from "express";
import { products } from "../utils/products";

export const checkOut = (req: Request, res: Response): void => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || !items.length) {
      res.status(400).json({
        success: false,
        message: "Items array is required",
      });
      return;
    }
    // Calculate items total and order
    let total: number = 0;
    const orderDetails: any[] = [];

    for (const item of items) {
      const product = products.find((p) => p.id == item.id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: `Product with ID ${item.id} not found`,
        });
        return;
      }

      if (!item.quantity || item.quantity <= 0) {
        res.status(400).json({
          success: false,
          message: `Invalid quantity. Product ID ${product.id}`,
        });
        return;
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      orderDetails.push({ ...product, itemTotal });
    }

    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    console.log("Order Placed!");
    console.log(`Order ID: ${orderId}`);
    console.log(`Total: $${total.toFixed(2)}`);
    console.log("Items:---");

    orderDetails.forEach((item) => {
      console.log(
        `  - ${item.title} (Qty: ${item.quantity}) - $${item.itemTotal.toFixed(
          2
        )}`
      );
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: {
        success: true,
        message: "Order processed successfully",
        orderId,
        total: parseFloat(total.toFixed(2)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing checkout",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
