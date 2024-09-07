const express = require("express");
const { jsonMain } = require("../controllers/page");

const router = express.Router();

router.get("/", jsonMain);

module.exports = router;
