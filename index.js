require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
require('./db_connection');
const DB = require('./modules/user.module');
const url = require("url");
const open = require('open');
open('./client/public/firstPage/firstPage.html');



// Configurations //
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.json());

// Routes //
app.use("/", express.static(path.join(__dirname, "client/public")));

// app.use("/api", require("./routes/root"));

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Connection //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
