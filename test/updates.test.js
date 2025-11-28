const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const Update = require("../models/updatesSchema");

describe("Updates API", () => {
  let token;
  let userId;

  beforeAll(async () => {
    // It's recommended to use a separate test database
    // For simplicity, we are using the dev database here.
    // Make sure your DB_URI is configured in your .env file
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a user for authentication
    const user = {
      username: "testuser",
      password: "password123",
      name: "Test User",
    };

    const res = await request(app).post("/api/v1/user/signup").send(user);
    userId = res.body._id;

    const loginRes = await request(app)
      .post("/api/v1/user/login")
      .send({ username: user.username, password: user.password });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    // Clean up created data
    await User.findByIdAndDelete(userId);
    await Update.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/v1/updates/createUpdate", () => {
    it("should create a new update", async () => {
      const newUpdate = {
        title: "New Test Update",
        body: "This is the content of the test update.",
      };

      const res = await request(app)
        .post("/api/v1/updates/createUpdate")
        .set("Authorization", `Bearer ${token}`)
        .send(newUpdate);

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe(newUpdate.title);
      expect(res.body.body).toBe(newUpdate.body);
    });

    it("should return 401 if no token is provided", async () => {
      const newUpdate = {
        title: "Another Update",
        body: "Some content.",
      };

      const res = await request(app)
        .post("/api/v1/updates/createUpdate")
        .send(newUpdate);

      expect(res.statusCode).toEqual(401);
    });
  });

  describe("GET /api/v1/updates/getAllUpdates", () => {
    it("should return all updates", async () => {
      const res = await request(app)
        .get("/api/v1/updates/getAllUpdates")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should return 401 if no token is provided", async () => {
      const res = await request(app).get("/api/v1/updates/getAllUpdates");

      expect(res.statusCode).toEqual(401);
    });
  });
});
