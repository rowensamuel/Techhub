const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../database');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new product (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image, rating, discount, stock, specs } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const product = await createProduct({
      name,
      description,
      price,
      category,
      image,
      rating: rating || 0,
      discount: discount || 0,
      stock: stock || 0,
      specs: specs || []
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category, image, rating, discount, stock, specs } = req.body;

    const product = await updateProduct(req.params.id, {
      name,
      description,
      price,
      category,
      image,
      rating,
      discount,
      stock,
      specs
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id);
    if (!result.deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
