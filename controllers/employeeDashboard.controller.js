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
} = require("./handleControllerErrors");


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

homeAddress = (req, res) => {
    console.log(req.query.id, req.query.home_address);
    if(!req.query.id)
        return invalidId(req, res);
    if(!req.query.home_address)
        return missing_homeAddress(req, res);
    const data = setHomeAddress(req.query.id, req.query.home_address);
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));
};

askVacation = (req, res) => {
    console.log(req.query.id, req.query.vacation_start_date, req.query.vacation_finish_date);
    if(!req.query.id)
        return invalidId(req, res);
    const data = setVacationRequest(req.query.id, req.query.vacation_start_date, req.query.vacation_finish_date);
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));
};

module.exports = {
    // getVacations: getVacations,
    employeeInfo: employeeInfo,
    homeAddress: homeAddress,
    askVacation: askVacation,
};

