'use strict';

const express = require('express');
const app = express();

const hello = require('./routes/hello');
const fruits = require('./routes/fruits');
const fruit_price = require('./routes/fruit_price');
const predict_price = require('./routes/predict_price');
const postRoutes = require('./routes/posts');

const predict_table = require('./services/update_predict_table');
const price_query_table = require('./services/update_price_query_table');
const post_db = require('./services/post_db');
const { post } = require('./routes/hello');

app.use('/hello', hello);
app.use('/fruits', fruits);

app.use('/fruit_price', fruit_price);
app.use('/predict_price', predict_price);
app.use('/posts', postRoutes);


const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, function(){
    predict_table.update();
    price_query_table.update();
    post_db.create_table();
    // post_db.add_some_data();
});
console.log(`Running on http://${HOST}:${PORT}`);
