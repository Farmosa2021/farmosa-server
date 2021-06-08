var express = require('express');
const router = express.Router({mergeParams: true});
const fruit_db = require('../services/fruit_db');
// *Format
// ID int NOT NULL AUTO_INCREMENT, \
// name varchar(20), \
// image varchar(128), \

//* SHOW all posts
router.get("/", async function (req, res, next) {
    res.json(await fruit_db.search_fruit())
});

//* SHOW post
router.get("/images", async function (req, res, next) {
    res.json(await fruit_db.search_image_by_fruit(req.body.fruit))
});

router.get("/realtime/sub", async function (req, res, next) {
    res.json(await fruit_db.search_realtime_by_sub(req.body.fruit, req.body.market))
});
router.get("/realtime", async function (req, res, next) {
  res.json(await fruit_db.search_realtime_by_fullname(req.body.fruit, req.body.market))
});

router.get("/history/sub", async function (req, res, next) {
  res.json(await fruit_db.search_history_by_sub(req.body.fruit))
});

router.get("/history", async function (req, res, next) {
res.json(await fruit_db.search_history_by_fullname(req.body.fruit))
});
router.get("/realtime/markets", async function (req, res, next) {
  res.json(await fruit_db.get_all_markets())
  });
module.exports = router;
