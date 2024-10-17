const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("User authenticated:", decoded);
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(400).json({ message: "Invalid token." });
    }
  }
};

module.exports = auth;
