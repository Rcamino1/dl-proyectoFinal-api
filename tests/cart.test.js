const request = require("supertest");
const jwt = require("jsonwebtoken");
const server = require("../index");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn().mockImplementation((token, secret, callback) => {
    callback(null, { id: "test_user_id", role: "user" });
  }),
}));

describe("Cart Operations", () => {
  it("Adding a product to the cart returns 201", async () => {
    const newProduct = { productId: "test_product_id", cantidad: 1 };
    const response = await request(server)
      .post("/cart")
      .send(newProduct)
      .set("Authorization", "Bearer test_token");
    expect(response.statusCode).toBe(201);
  });

  it("Updating an item in the cart returns 200", async () => {
    const updatedProduct = { cantidad: 2 };
    const productIdToUpdate = "test_product_id";
    const response = await request(server)
      .put(`/cart/${productIdToUpdate}`) // Adjust this endpoint to match your actual route
      .send(updatedProduct)
      .set("Authorization", "Bearer test_token");
    expect(response.statusCode).toBe(200);
  });

  it("Getting the cart returns 200", async () => {
    const response = await request(server)
      .get("/cart") // Adjust this endpoint to match your actual route
      .set("Authorization", "Bearer test_token");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Removing an item from the cart returns 200", async () => {
    const productIdToRemove = "test_product_id";
    const response = await request(server)
      .delete(`/cart/${productIdToRemove}`) // Adjust this endpoint to match your actual route
      .set("Authorization", "Bearer test_token");
    expect(response.statusCode).toBe(200);
  });
});
