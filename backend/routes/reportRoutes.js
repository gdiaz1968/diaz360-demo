const express = require("express");
const router = express.Router();
const { generarReporteStock } = require("../controllers/reportController");

router.get("/stock", generarReporteStock);

module.exports = router;
