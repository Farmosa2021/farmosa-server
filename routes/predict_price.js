const express = require('express');
const router = express.Router();
const predict_price = require('../services/predict_price');

/* GET quotes listing. */
router.get('/:date', async function(req, res, next) {
  try {
    res.json(await predict_price.getPredictPrice(req.params.date));
  } catch (err) {
    console.error(`Error while getting predict price `, err.message);
    next(err);
  }
});

router.get('/:fruit/:from_date/:to_date', async function(req, res, next) {
  try {
    res.json(await predict_price.getPredictPrices(req.params.fruit, req.params.from_date, req.params.to_date));
  } catch (err) {
    console.error(`Error while getting predict prices `, err.message);
    next(err);
  }
});

module.exports = router;