const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController.js');

router.post('/', saleController.crearVenta);
router.get('/', saleController.obtenerVentas);

module.exports = router;
