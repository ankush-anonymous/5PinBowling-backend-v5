const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  // ✅ User Signup
  signup: async (req, res) => {
    try {
      const { username, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = new User({
        username,
        password: hashedPassword,
        name,
      });

      await user.save();

      console.info("User created | ID:", user._id);
      // Respond without the password
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json(userResponse);
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ User Login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create and sign a JWT
      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.info("User logged in | ID:", user._id);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in user:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
