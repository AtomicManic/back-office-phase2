const router = require("express").Router();
const path = require("path");
const {
    getVacations,
    employeeInfo,
    updateHomeAddress,
    askVacation,
} = require("./../controllers/employeeDashboard.controller");

router.get("^/$|index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

router.get("/employeeInfo", (req, res) => {
    employeeInfo(req, res);
});

router.put("/homeAddress", (req, res) => {
    updateHomeAddress(req, res);
});

router.post("/vacationRequest", (req, res) => {
    askVacation(req, res);
});

module.exports = router;
