const express = require('express');
const router = express.Router();
const fruits = require('../services/fruits');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await fruits.getFruits());
  } catch (err) {
    console.error(`Error while getting fruits `, err.message);
    next(err);
  }
});

module.exports = router;