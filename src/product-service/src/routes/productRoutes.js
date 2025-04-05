const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// GET all products (can filter by userId with query param)
router.get('/', productController.getProducts);

// GET product by ID
router.get('/:id', productController.getProductById);

// POST create new product
router.post('/', productController.createProduct);

// PUT update product
router.put('/:id', productController.updateProduct);

// DELETE product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
