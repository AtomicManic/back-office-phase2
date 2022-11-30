const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); //'!' is none null assersion in typescript
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
