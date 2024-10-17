const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Signup
const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.warn("Username or password missing");
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.warn("Username already exists:", username);
      return res.status(400).json({
        message: "Username already exists. Please choose another one.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    console.log("User created successfully:", newUser);
    return res.status(201).json({
      message: "User created successfully.",
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user", error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.warn("Username or password missing");
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.warn("User not found:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.warn("Password mismatch for user:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Login successful, token created for user:", user);

    return res.status(200).json({
      token,
      message: "Login successful",
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { signup, login };
