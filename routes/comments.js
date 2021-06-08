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
router.post("/", async function (req, res, next) {
    // get data from format and add to array
    // var newComment = req.body.newComment
    try{
        res.json(await comment_db.insert_data(req.body, req.params.id))
        console.log("Insert data...")
    }catch(err){
        console.log(err);
    }
});



//* EDIT
router.put("/:cid",async function (req, res) { 
        console.log("Update comment...")
        res.json(await comment_db.search_data_by_id_and_update(req.params.id, req.params.cid, req.body))
 })


module.exports = router;
