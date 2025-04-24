// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

router.post('/', productController.crearProducto);
router.get('/', productController.obtenerProductos);
router.get('/:id', productController.obtenerProducto);
router.put('/:id', productController.actualizarProducto);
router.delete('/:id', productController.eliminarProducto);

module.exports = router;
