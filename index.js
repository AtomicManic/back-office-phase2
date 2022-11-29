require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

// Configurations //
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.json());

// Routes //
app.use("/", express.static(path.join(__dirname, "client/public")));

app.use("/", require("./routes/root"));

// Connection //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
