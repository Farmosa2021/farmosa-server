'use strict';

const express = require('express');
const app = express();

const hello = require('./routes/hello');
const fruits = require('./routes/fruits');
const fruit_price = require('./routes/fruit_price');

app.use('/hello', hello);
app.use('/fruits', fruits);
app.use('/fruit_price', fruit_price);

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);