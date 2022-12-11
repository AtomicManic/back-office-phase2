const router = require("express").Router();
// const path = require("path");
const {
    userInfo,
    getUsers,
    updateStatus,
    updateUser,
    createUser,
    deleteUser,
    checkRole,
    userStatus,
    usersRole,
} = require("../controllers/admin.controller");

router.get("/userInfo", (req, res) => {
    userInfo(req, res);
});

router.get("/userStatus", (req, res) => {
    userStatus(req, res);
});

router.get("/usersRole", (req, res) => {
    usersRole(req, res);
});

router.get("/getUsers", (req, res) => {
    getUsers(req, res);
});

router.put("/updateStatus", (req, res) => {
    updateStatus(req, res);
});

router.put("/updateUser", (req, res) => {
    updateUser(req, res);
});

router.post("/createUser", (req, res) => {
    createUser(req, res);
});

router.delete("/deleteUser", (req, res) => {
    deleteUser(req, res);
});

router.get("/checkRole", (req, res) => {
    checkRole(req, res);
});

module.exports = router;
