const router = require("express").Router();
const { register } = require("./../controllers/auth.controller");

router.post("/user", register);

module.exports = router;
