const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/user.route");
const imageRoutes = require("./routes/image");
const connectDB = require("./db/config");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;
// Start the server
app.get("/", (req, res) => {
  res.send("Welcome to Image Gallery API");
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


