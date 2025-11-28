const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const Booking = require("../models/slotBookingSchema");
const Package = require("../models/packageSchema");

describe("Bookings API", () => {
  let token;
  let userId;
  let packageId;

  beforeAll(async () => {
    // It's recommended to use a separate test database
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a user for authentication
    const user = {
      username: "testuser-bookings",
      password: "password123",
      name: "Test User Bookings",
    };

    const res = await request(app).post("/api/v1/user/signup").send(user);
    userId = res.body._id;

    const loginRes = await request(app)
      .post("/api/v1/user/login")
      .send({ username: user.username, password: user.password });
    token = loginRes.body.token;

    // Create a package to be used in bookings
    const pkg = new Package({ packageName: "Test Package" });
    await pkg.save();
    packageId = pkg._id;

    // Create some bookings for testing
    const booking1 = new Booking({
      customerName: "John Doe",
      date: new Date("2025-11-28"),
      package_id: packageId,
    });
    const booking2 = new Booking({
      customerName: "Jane Doe",
      date: new Date("2025-11-28"),
      package_id: packageId,
    });
    const booking3 = new Booking({
      customerName: "Peter Pan",
      date: new Date("2025-11-29"),
      package_id: packageId,
    });

    await Booking.insertMany([booking1, booking2, booking3]);
  });

  afterAll(async () => {
    // Clean up created data
    await User.findByIdAndDelete(userId);
    await Booking.deleteMany({});
    await Package.findByIdAndDelete(packageId);
    await mongoose.connection.close();
  });

  describe("GET /api/v1/slotbooking/getAllBookings", () => {
    it("should return bookings grouped by date", async () => {
      const res = await request(app)
        .get("/api/v1/slotbooking/getAllBookings")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);

      // We expect 2 groups of bookings for the 2 dates we created
      expect(res.body.data.length).toBe(2);

      const group1 = res.body.data.find(g => g.date === "2025-11-28");
      const group2 = res.body.data.find(g => g.date === "2025-11-29");

      expect(group1.bookings_details.length).toBe(2);
      expect(group2.bookings_details.length).toBe(1);
    });
  });
});
