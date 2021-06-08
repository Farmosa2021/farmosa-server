'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const hello = require('./routes/hello');
const fruits = require('./routes/fruits');
const fruit_price = require('./routes/fruit_price');
const predict_price = require('./routes/predict_price');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');

const predict_table = require('./services/update_predict_table');
const price_query_table = require('./services/update_price_query_table');
const create_fruit_table = require("./services/create_fruit_table");

const post_db = require('./services/post_db');
const comment_db = require('./services/comment_db');
const user_db = require('./services/user_db');
const { post } = require('./routes/hello');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use('/hello', hello);
app.use('/fruits', fruits);

app.use('/fruit_price', fruit_price);
app.use('/predict_price', predict_price);
app.use('/posts', postRoutes);
app.use('/posts/:id/comments', commentRoutes);
app.use('/users', userRoutes);

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, async function(){
    await create_fruit_table.create_fruit_table();
    await predict_table.update();
    await price_query_table.update();
    await post_db.create_table();
    await comment_db.create_table();
    await user_db.create_table();

});
console.log(`Running on http://${HOST}:${PORT}`);
