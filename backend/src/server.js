require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const urlRoutes = require("./routes/urlRoutes");
const { redirectUrl } = require("./controllers/urlController");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//Middlewares
app.use(morgan("dev")); // useful in dev to see incoming requests
app.use(express.json()); // parse JSON bodies from requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

//Health check
app.get("./health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString });
});

//API routes
app.use("/api/urls", urlRoutes);

//Redirect route
app.get("/:slug", redirectUrl);

//Connect to Database and start server
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start app", err);
    process.exit(1);
  }
}

start();
