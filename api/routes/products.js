// routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.delete(req.params.id);
    if (deletedProduct === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update a product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.params.id, req.body);
    if (updatedProduct === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST route to sell a product
router.post('/:id/sell', async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const soldProduct = await Product.sell(req.params.id, quantity);
    if (soldProduct === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product sold' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to restock a product
router.post('/:id/restock', async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const restockedProduct = await Product.restock(req.params.id, quantity);
    if (restockedProduct === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product restocked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;