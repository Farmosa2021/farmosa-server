const express = require('express');
const comment_db = require('../services/comment_db');
const router = express.Router({mergeParams: true});

// *Format
// author
// content
// time
// CID
// ref (PID)
//* SHOW all posts
router.get("/", async function (req, res, next) {
    // Get posts from database
    res.json(await comment_db.search_data_by_id(req.params.id))
});


//* CREATE
router.get("/new", function (req, res) {
    res.send("new page!");
});
router.post("/", async function (req, res, next) {
    // get data from format and add to array
    // var newComment = req.body.newComment
    try{
        var newComment = {
            author: req.body.author,
            content: req.body.content,
            PID: req.params.id
        };
        await comment_db.insert_data(newComment)
        console.log("Insert data...")
        console.log(JSON.stringify(newComment))
    }catch(err){
        console.log(err);
    }
});



//* EDIT
router.get("/:cid/edit", function (req, res) {
    res.send("Edit page!");
});
router.put("/:cid", function (req, res) { 
    comment_db.search_data_by_id_and_update(req.params.cid, req.body.newComment , function (err, foundPost) {
        if(err){
            res.redirect("/posts")
        }
        else{
            res.redirect("/posts/"+req.params.id)
        }
      })
 })


module.exports = router;
