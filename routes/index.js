var express = require("express");
var router = express.Router();
var api = require("./app/index.js");

router.use("/api", api);

module.exports = router;
