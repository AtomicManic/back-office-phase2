const bcrypt = require("bcrypt");
const _ = require("lodash");

invalidId = (req, res) => {
    res.writeHeader(404);
    res.write('{"error": "Invalid id"}');
    res.end();
};

invalidInput = (req, res) => {
    res.writeHeader(404);
    res.write('{"error": "One or more parameters is missing"}');
    res.end();
};

invalidStatus = (req, res) => {
    res.writeHeader(404);
    res.write('{"error": "Invalid status input"}');
    res.end();
};

missing_homeAddress = (req, res) => {
    res.writeHeader(404);
    res.write('{"error": "Missing home address"}');
    res.end();
};

module.exports = {
    invalidId: invalidId,
    missing_homeAddress: missing_homeAddress,
    invalidStatus: invalidStatus,
    invalidInput: invalidInput,
};