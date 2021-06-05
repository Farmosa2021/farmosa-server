const express = require('express');
const post_db = require('../services/post_db');
const router = express.Router();

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
router.get("/:id", async function (req, res, next) {
    // find a campground and show the info
    res.json(await post_db.search_data_by_id(req.params.id))
});

//* CREATE
router.get("/new", function (req, res) {
    res.send("new page!");
});
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
        await post_db.insert_data(newPost)
        console.log("Insert data...")
        console.log(JSON.stringify(newPost))
    }catch(err){
        console.log(err);
    }
});

module.exports = router;


//* EDIT
router.get("/:id/edit", function (req, res) {
    res.send("Edit page!");
});
router.put("/:id", function (req, res) { 
    post_db.search_data_by_id_and_update(req.params.id, req.body.newPost , function (err, foundPost) {
        if(err){
            res.redirect("/posts")
        }
        else{
            res.redirect("/posts/"+req.params.id)
        }
      })
 })
