const express = require('express');
const user_db = require('../services/user_db');
const router = express.Router();

// *Format
// UID
// name
// password

//* SHOW all posts
router.get("/", async function (req, res, next) {
    // Get posts from database
    res.json(await user_db.get_data())
});

//* SHOW post
router.get("/:id/favor", async function (req, res, next) {
    // find a campground and show the info
    res.json(await user_db.search_favor_by_id(req.params.id))
});

router.post("/:id/favor", async function (req, res, next) {
    // find a campground and show the info
    res.json(await user_db.insert_favor(req.body, req.params.id))
});
router.get("/:id", async function (req, res, next) {
    // find a campground and show the info
    res.json(await user_db.search_data_by_id(req.params.id))
});

//* register
router.post("/", async function (req, res, next) {
    try{
        var newUser = {
            username: req.body.username,
            password: req.body.password
        };
        res.json(await user_db.insert_data(newUser))
        console.log("register user...")
        console.log(JSON.stringify(newUser))
    }catch(err){
        console.log(err);
    }
});

//* AUTH
router.post("/auth", async function (req, res) { 
    try{
        var newUser = {
            username: req.body.username,
            password: req.body.password
        };
        console.log("auth user...")
        console.log(JSON.stringify(newUser))
        res.json(await user_db.auth(newUser))
    }catch(err){
        console.log(err);
    }
 })
 module.exports = router;
