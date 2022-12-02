const router = require("express").Router();
const path = require("path");
const managerController = require("./../controller/manager.controller");


router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// second page
router.get("^/$|employee(.html)?", (req, res) => {
  findEmployeeById(req, res);
});

router.put("^/$|employee(.html)?", (req, res) => {
  editEmployeesInfo(req, res);
});

module.exports = router;
