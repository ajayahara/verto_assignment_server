import request from "supertest";
import { app } from "../src/app";

describe("Checkout API", () => {
  describe("POST /api/checkout", () => {
    it("should process a valid checkout", async () => {
      const checkoutData = {
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 },
        ],
      };
      const response = await request(app)
        .post("/api/checkout")
        .send(checkoutData)
        .expect(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe("Order placed successfully");
      expect(response.body.data.success).toBe(true);
      expect(response.body.data.message).toBe("Order processed successfully");
      expect(response.body.data.total).toBe(242.2);
    });

    it("should return 400 for empty items array", async () => {
      const checkoutData = {
        items: [],
      };
      const response = await request(app)
        .post("/api/checkout")
        .send(checkoutData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Items array is required");
    });

    it("should return 404 for non-existent product", async () => {
      const checkoutData = {
        items: [
          { id: 1, quantity: 2 },
          { id: 100, quantity: 1 },
        ],
      };
      const response = await request(app)
        .post("/api/checkout")
        .send(checkoutData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Product with ID 100 not found");
    });

    it("should return 404 for non-existent product", async () => {
      const checkoutData = {
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: -1 },
        ],
      };
      const response = await request(app)
        .post("/api/checkout")
        .send(checkoutData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid quantity. Product ID 2");
    });
  });
});
