const router = require("express").Router();
const {
    userInfo,
    updateUser,
    deleteUser,
    checkRole,
    checkStatus,
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

router.get("/checkRole", (req, res) => {
    checkRole(req, res);
});

router.get("/checkStatus", (req, res) => {
    checkStatus(req, res);
});



module.exports = router;
