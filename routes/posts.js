var express = require('express');
const router = express.Router({mergeParams: true});
const post_db = require('../services/post_db');
// *Format
// author
// title
// fruit
// content
// PID

//* SHOW all posts
router.get("/", async function (req, res, next) {
    // Get posts from database
    res.json(await post_db.get_data())
});

//* SHOW post
router.get("/fruits/:fruitName", async function (req, res, next) {
    // find a campground and show the info
    res.json(await post_db.search_data_by_fruit(req.params.fruitName))
});
router.get("/users/:userName", async function (req, res, next) {
    // find a campground and show the info
    res.json(await post_db.search_data_by_user(req.params.userName))
});
router.get("/:id", async function (req, res, next) {
    // find a campground and show the info
    res.json(await post_db.search_data_by_id(req.params.id))
});
//* CREATE
router.post("/", async function (req, res, next) {
    // get data from format and add to array
    // var newPost = req.body.newPost
    try{
        var newPost = {
            author: req.body.author,
            title: req.body.title,
            fruit: req.body.fruit,
            content: req.body.content
        };
        res.json(await post_db.insert_data(newPost))
        console.log("Insert data...")
        console.log(JSON.stringify(newPost))
    }catch(err){
        console.log(err);
    }
});

//* EDIT
router.put("/:id", async function (req, res) { 
    console.log("Update data...")
    res.json(await post_db.search_data_by_id_and_update(req.params.id, req.body))
 })
 module.exports = router;
