require("dotenv").config();
require('./db_connection');
const express = require("express");
const path = require("path");
const cors = require("cors");
// const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
// const DB = require('./modules/user.module');
// const url = require("url");
const open = require('open');
const PORT = process.env.PORT || 4000;
const app = express();
open('./client/public/firstPage/firstPage.html');

// Configurations //
app.use(cors());
app.use(express.json());

// Routes //
app.use("/", express.static(path.join(__dirname, "client/public")));
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Connection //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
