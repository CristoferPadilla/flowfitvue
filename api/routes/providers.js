// routes/providers.js

const express = require('express');
const router = express.Router();
const Provider = require('../models/provider');

// GET route to get all providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.getAll();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new provider
router.post('/', async (req, res) => {
  try {
    const newProvider = await Provider.create(req.body);
    res.status(201).json(newProvider);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a provider
router.delete('/:id', async (req, res) => {
  try {
    const deletedProvider = await Provider.delete(req.params.id);
    if (deletedProvider === 0) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.status(200).json({ message: 'Provider deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update a provider
router.put('/:id', async (req, res) => {
  try {
    const updatedProvider = await Provider.update(req.params.id, req.body);
    if (updatedProvider === 0) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.status(200).json({ message: 'Provider updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;