const router = require("express").Router();
const path = require("path");
const { loginRequired } = require("./auth.routes");
const jwt = require("jsonwebtoken");

router.get("/dashboard", (req, res) => {
  let filePath = "";
  const token = req.cookies.token;
  try {
    const { userObj } = jwt.verify(token, process.env.TOKEN_SECRET);
    if (userObj.role === "manager") {
      filePath = "managerDashMock/managerMock.html";
    } else if (userObj.role === "employee") {
      filePath = "employeeDashMock/employeeMock.html";
    } else {
      res.redirect("/");
      res.end();
    }
    res.sendFile(path.join(__dirname, "..", "client", "public", filePath));
  } catch (error) {
    res.redirect("/");
    res.end();
  }
});

module.exports = router;
