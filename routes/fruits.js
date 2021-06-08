var express = require('express');
const router = express.Router({mergeParams: true});
const fruit_db = require('../services/fruit_db');
// *Format
// ID int NOT NULL AUTO_INCREMENT, \
// name varchar(20), \
// image varchar(128), \

//* SHOW all posts
router.get("/", async function (req, res, next) {
    res.json(await fruit_db.get_data())
});

//* SHOW post
router.get("/images/:fruitName", async function (req, res, next) {
    res.json(await fruit_db.search_data_by_fruit(req.params.fruitName))
});

router.get("/realtime/sub/:fruitName", async function (req, res, next) {
    res.json(await fruit_db.search_realtime_by_fruit_sub(req.params.fruitName))
});

router.get("/realtime/:fruitName", async function (req, res, next) {
  res.json(await fruit_db.search_realtime_by_fruit(req.params.fruitName))
});

router.get("/history/sub/:fruitName", async function (req, res, next) {
  res.json(await fruit_db.search_history_by_fruit_sub(req.params.fruitName))
});

router.get("/history/:fruitName", async function (req, res, next) {
res.json(await fruit_db.search_history_by_fruit(req.params.fruitName))
});

 module.exports = router;
