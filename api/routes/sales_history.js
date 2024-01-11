// routes/sales_history.js

const express = require('express');
const router = express.Router();
const SalesHistory = require('../models/sales_history');
const Product = require('../models/product');

// GET route to get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await SalesHistory.getAll();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new sale
router.post('/', async (req, res) => {
  try {
    const newSale = await SalesHistory.create(req.body);
    await Product.decreaseQuantity(req.body.ID_Producto, req.body.Cantidad);
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;