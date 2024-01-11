// routes/members.js

const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// GET route to get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.getAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new member
router.post('/', async (req, res) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;