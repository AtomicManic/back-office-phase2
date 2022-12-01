const router = require("express").Router();
const {
  register,
  login,
  loginRequired,
  logout,
} = require("./../controllers/auth.controller");

router.post("/user", register);
router.post("/login", login);
router.post("/logout", loginRequired, logout);

module.exports = router;
