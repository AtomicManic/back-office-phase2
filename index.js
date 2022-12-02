require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const { vacationsRouter } = require('./routes/vacation.routes')
const { bulkRouter } = require('./routes/bulk.routers');
const { usersRouter } = require("./routes/users.routes");

// Configurations //
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.json());
//enable work with request body
app.use(express.urlencoded({extended: true}));

// Routes //
app.use("/", express.static(path.join(__dirname, "client/public")));
app.use("/", require("./routes/root"));

//handle every request to this specific path
app.use('/api/users' , usersRouter);
app.use('/api/vacations' , vacationsRouter);
app.use('/api/bulkImport' , bulkRouter);


//always last!! code "fall" there if it won't catch route.
app.use((req,res) => {
    res.status(400).send("Something went wrong...");
})

// Connection //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
