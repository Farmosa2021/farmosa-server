const express = require('express');
const router = express.Router();
const fruits = require('../services/fruit_price');

/* GET quotes listing. */
router.get('/:dateStart/:dateEnd/:item/:market', async function(req, res, next) {
  try {
    res.json(await fruits.getFruitData(req.params.dateStart, req.params.dateEnd, req.params.item, req.params.market));
  } 
  catch (err) {
    console.error(`Error while getting fruit_price `, err.message);
    next(err);
  }
});
module.exports = router;