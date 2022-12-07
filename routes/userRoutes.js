const router = require("express").Router();
const path = require("path");
const {
    userInfo,
    updateUser,
    deleteUser,
    askVacation,
} = require("../controllers/user.controller");

router.get("/userInfo", (req, res) => {
    userInfo(req, res);
});

router.put("/update", (req, res) => {
    updateUser(req, res);
});

router.delete("/delete", (req, res) => {
    deleteUser(req, res);
});



module.exports = router;
