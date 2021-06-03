'use strict';

const express = require('express');
const app = express();

const hello = require('./routes/hello');
const fruits = require('./routes/fruits');
const predict_table = require('./services/update_predict_table');
const price_query_table = require('./services/update_price_query_table');

app.use('/hello', hello);
app.use('/fruits', fruits);

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, function(){
    predict_table.update();
    price_query_table.update();
});
console.log(`Running on http://${HOST}:${PORT}`);
