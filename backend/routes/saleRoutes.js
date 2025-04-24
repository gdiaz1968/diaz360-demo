// routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/', saleController.crearVenta);
router.get('/', saleController.obtenerVentas);

module.exports = router;
