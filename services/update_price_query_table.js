// Importing mysql and csvtojson packages
// Requiring module
const db = require('./db');

async function update(){
    // Query to create table "sample"
    var createStatament = "CREATE TABLE IF NOT EXISTS price_query( \
        date DATE not null, \
        item VARCHAR(30) not null, \
        market VARCHAR(10) not null, \
        high_price FLOAT, \
        mid_price FLOAT, \
        low_price FLOAT, \
        avg_price FLOAT, \
        amount FLOAT \
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    await db.query(createStatament);


    // var express = require('express');
    // var router = express.Router();
    var request = require('request');

    // Urls for App Center REST functions
    var URL = "https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx";

    /* TEST: function to GET report list */
    request({url: URL, json: true}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(error) // Print the json response
        }
        for (var i = 0; i < body.length; i++) {
            var d = body[i]["交易日期"],
                item = body[i]["作物名稱"],
                market = body[i]["市場名稱"],
                high_price = body[i]["上價"],
                mid_price = body[i]["中價"],
                low_price = body[i]["下價"],
                avg_price = body[i]["平均價"],
                amount = body[i]["交易量"]
            
            var DATE = d.split('.');
            DATE[0] = (Number(DATE[0]) + 1911).toString();
            date = DATE[0] + '-' + DATE[1] + '.' + DATE[2];
            var insertStatement = "INSERT INTO price_query values(?, ?, ?, ?, ?, ?, ?, ?)";
            var items = [date, item, market, high_price, mid_price, low_price, avg_price, amount];
    
            // Inserting data of current row
            // into database
            db.query(insertStatement, items);
        }
    });
}

module.exports = {
    update
}