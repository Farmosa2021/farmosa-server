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
router.get("/", function (req, res) {
    // Get posts from database
    res.send(post_db.get_data());
});
//* SHOW post
router.get("/:id", function (req, res) {
    // find a campground and show the info
    post_db.search_data_by_id(req.params.id)
});

//* CREATE
router.get("/new", function (req, res) {
    res.send("new page!");
});
router.post("/", function (req, res) {
    // get data from format and add to array
    // var newPost = req.body.newPost
    var newPost = {
        author: req.body.author,
        title: req.body.title,
        fruit: req.body.fruit,
        content: req.body.content
    };
    post_db.insert_data(newPost)

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
