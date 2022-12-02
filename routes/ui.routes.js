const router = require("express").Router();
const path = require("path");
const { loginRequired } = require("./auth.routes");

router.get("/dashboard", (req, res) => {
  console.log(req.session);
  let filePath = "";

  if (req.session.role === "manager") {
    filePath = "managerDashMock/managerMock.html";
  } else if (req.session.role === "employee") {
    filePath = "employeeDashMock/employeeMock.html";
  } else {
    res.redirect("/");
    res.end();
  }
  res.sendFile(path.join(__dirname, "..", "client", "public", filePath));
});

module.exports = router;
