const router = require("express").Router();
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

module.exports = router;
