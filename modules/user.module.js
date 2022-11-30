const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  vacation_days: {
    type: Number,
    required: true,
  },
});

const userModel = model("User", userSchema);
module.exports = userModel;
