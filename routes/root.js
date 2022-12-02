const router = require("express").Router();
const path = require("path");
const {
  getVacations,
  employeeInfo,
  homeAddress,
  askVacation,
} = require("./../controllers/employeeDashboard.controller");

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// second page
router.get("^/$|employee(.html)/api/employeeInfo?", (req, res) => {
  employeeInfo(req, res);
});

router.put("^/$|employee(.html)/api/home_address", (req, res) => {
  homeAddress(req, res);
});

router.post("^/$|employee(.html)/api/vacation_request", (req, res) => {
  askVacation(req, res);
});

module.exports = router;
