const express = require('express');
const router = express.Router();
const fruits = require('../services/fruit_price');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await fruits.getFruitData(date_start, date_end, item, market));
  } 
  catch (err) {
    console.error(`Error while getting fruit_price `, err.message);
    next(err);
  }
});
module.exports = router;