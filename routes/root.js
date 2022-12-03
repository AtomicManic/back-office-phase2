const router = require("express").Router();
const path = require("path");
const managerController = require("./../controller/manager.controller");


router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// second page
router.get("^/$|manager(.html)?", (req, res) => {
  findEmployeeById(req, res);
});

router.put("^/$|manager(.html)?", (req, res) => {
  editEmployeesInfo(req, res);
});


router.post("^/$|manager(.html)?", (req, res) => {
  addEmployee(req, res);
});

router.delete("^/$|manager(.html)?", (req, res) => {
  deleteUser(req, res);
});


module.exports = router;
