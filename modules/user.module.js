const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

const userModel = model('employee', userSchema);

const roleSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
});

const roleModel = model('role', roleSchema);

const statusSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const statusModel = model('status', statusSchema);

module.exports = {
    userModel,
    roleModel,
    statusModel,
};