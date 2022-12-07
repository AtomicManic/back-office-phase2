const bcrypt = require("bcrypt");
const _ = require("lodash");

invalidId = (req, res) => {
    res.writeHeader(404);
    res.write('Invalid id');
    res.end();
};

invalidInput = (req, res) => {
    res.writeHeader(404);
    res.write('One or more parameters is missing');
    res.end();
};

invalidStatus = (req, res) => {
    res.writeHeader(404);
    res.write('Invalid status input');
    res.end();
};

missing_homeAddress = (req, res) => {
    res.writeHeader(404);
    res.write('Missing home address');
    res.end();
};

module.exports = {
    invalidId: invalidId,
    missing_homeAddress: missing_homeAddress,
    invalidStatus: invalidStatus,
    invalidInput: invalidInput,
};