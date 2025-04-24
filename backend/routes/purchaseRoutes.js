// routes/purchaseRoutes.js
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController.js');

router.post('/', purchaseController.crearCompra);
router.get('/', purchaseController.obtenerCompras);

module.exports = router;
