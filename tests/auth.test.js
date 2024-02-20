const request = require("supertest");
const { Pool } = require("pg");
const { startServer, app } = require("../src/server/index.js");

describe("Auth Route", () => {
  let server;
  let pool;

  beforeAll(async () => {
    server = await startServer();
    pool = new Pool({
      connectionString: process.env.PG_DB,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  });

  afterAll(async () => {
    await server.close();
    if (pool) {
      await pool.end();
    }
  });

  it("should return a JWT token on successful login", async () => {
    // Simulate the result of the database query
    const mockQuery = jest.spyOn(pool, "query");
    mockQuery.mockResolvedValue({
      rows: [
        {
          id: 1,
          nombre: "Test",
          apellido: "User",
          email: "testuser@example.com",
          password_hash:
            "$2b$10$90hPijVxKH3u3vhlrK8zC.aNhYzrOQmUg7Q17D9rX7z9YX1sLh6Cm",
          rol: "user",
        },
      ],
    });

    const response = await request(server)
      .post("/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password",
      })
      .expect(200);

    expect(response.body.token).toBeDefined();

    // Restore the original method after the test
    mockQuery.mockRestore();
  });

  it("should return an error message for invalid credentials", async () => {
    // Simulate the result of the database query
    const mockQuery = jest.spyOn(pool, "query");
    mockQuery.mockResolvedValue({
      rows: [],
    });

    const response = await request(server)
      .post("/auth/login")
      .send({
        email: "nonexistentuser@example.com",
        password: "password",
      })
      .expect(401);

    expect(response.body.message).toBe("Invalid credentials");

    // Restore the original method after the test
    mockQuery.mockRestore();
  });
});
