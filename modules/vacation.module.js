const { model, Schema } = require("mongoose");

const vacationSchema = new Schema({
    employee_id: {
        type: Number,
        required: true,
    },
    start_date: {
        type: String,
        required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },

});

const vacationModel = model("Vacation", vacationSchema);
module.exports = vacationModel;
