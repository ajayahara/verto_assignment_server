import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { productRouter } from "./routes/product.route";
import { checkoutRouter } from "./routes/checkout.route";

// Function to create and configure the Express app
const app = express();
// Envs
const nodeEnv = process.env.NODE_ENV === "development";

// Middleware
app.use(cors());
app.use(helmet());
nodeEnv && app.use(morgan("dev"));
app.use(express.json());

// Use the API routes
app.use("/api/products", productRouter);
app.use("/api/checkout", checkoutRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    message: "Shopping Cart API",
  });
});

export { app };
