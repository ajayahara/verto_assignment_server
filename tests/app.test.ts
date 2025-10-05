import { app } from "../src/app";
import request from "supertest";

describe("Health Check", () => {
  it("should return health status", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Shopping Cart API");
  });
});
