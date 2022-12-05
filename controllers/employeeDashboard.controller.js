const User = require("./../modules/user.module");
const {
    setHomeAddress,
    setVacationRequest,
    getUserById,
    getAllUsers,
} = require("./../DAL/user.DAL");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
    invalidId,
    missing_homeAddress,
} = require("../handleErrors");


findAllEmployees = (req, res) => {
    const data = getAllUsers();
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));
};

employeeInfo = (req, res) => {
    console.log(req.query.id);
    if(!req.query.id)
        return invalidId(req, res);
    const data = getUserById(req.query.id);
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));
};

updateHomeAddress = (req, res) => {
    console.log(req.query.id, req.query.homeAddress);
    if(!req.query.id)
        return invalidId(req, res);
    if(!req.query.homeAddress)
        return missing_homeAddress(req, res);
    const data = setHomeAddress(req.query.id, req.query.homeAddress);
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));
};

askVacation = (req, res) => {
    console.log(req.query.id, req.query.vacationStartDate, req.query.vacationFinishDate);
    if(!req.query.id)
        return invalidId(req, res);
    const data = setVacationRequest(req.query.id, req.query.vacationStartDate, req.query.vacationFinishDate);
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));
};

module.exports = {
    // getVacations: getVacations,
    employeeInfo: employeeInfo,
    updateHomeAddress: updateHomeAddress,
    askVacation: askVacation,
};

