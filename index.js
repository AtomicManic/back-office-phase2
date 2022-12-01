require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db.connection");
const session = require("express-session");
const { sessionConfig } = require("./middleware/session.mw");
const router = require("express").Router();
const authRoutes = require("./routes/auth.routes");

// Configurations //
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use(cors());

// Routes //
app.use("/", express.static(path.join(__dirname, "/client/public")));
app.use("/", require("./routes/root"));
app.use("/api/auth", authRoutes);

// Connections //
connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
