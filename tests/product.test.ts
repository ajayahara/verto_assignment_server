import request from "supertest";
import { app } from "../src/app";

describe("Products API", () => {
  describe("GET /api/products", () => {
    it("should return all products", async () => {
      const response = await request(app).get("/api/products").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      // Check product structure
      const product = response.body.data[0];
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("title");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("rating");
      expect(product.rating).toHaveProperty("rate");
      expect(product.rating).toHaveProperty("count");
    });

    it("should return a specific product by ID", async () => {
      const response = await request(app).get("/api/products/1").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(1);
    });

    it("should return 404 for non-existent product", async () => {
      const response = await request(app).get("/api/products/999").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("not found");
    });
  });
});
