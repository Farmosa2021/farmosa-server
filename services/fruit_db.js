const db = require("./db");

async function search_realtime_by_sub(fruit, market) {
    var statement = "SELECT * FROM price_query where item LIKE '%" + fruit + "%' and market = " + market;
    if (fruit.length == 0 && market.length == 0) {
        statement = "SELECT * FROM price_query";
    }
    else if (fruit.length !=0 && market.length == 0) {
        statement = "SELECT * FROM price_query WHERE item LIKE '%" + fruit + "%'";
    }

    else if (fruit.length == 0 && market.length != 0) {
        statement = "SELECT * FROM price_query WHERE market = " + market;
    }
    try{
        const data = await db.query(statement);
        if(data.length==0){
            return { result: "error" };
        }
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}

async function search_realtime_by_fullname(fruit, market) {

    var statement = "SELECT * FROM price_query where item = " + fruit + " and market = " + market;
    if (fruit.length == 0 && market.length == 0) {
        statement = "SELECT * FROM price_query";
    }
    else if (fruit.length !=0 && market.length == 0) {
        statement = "SELECT * FROM price_query WHERE item = " + fruit + "%'";
    }

    else if (fruit.length == 0 && market.length != 0) {
        statement = "SELECT * FROM price_query WHERE market = " + market;
    }
    try{
        const data = await db.query(statement);
        if(data.length==0){
            return { result: "error" };
        }
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}

async function search_history_by_sub(fruit) {
    var statement = "SHOW COLUMNS FROM predict_table LIKE '%" + fruit + "%'";
    name_list = await db.query(statement);
    var columns = "DATE";
    for (i = 0; i<  len(name_list); i++){
        columns += (", " +name_list[i].field)
    }
    columns = columns.slice(0, -2)  
    try{
        statement = "SELECT" + columns + " FROM predict_table"
        const data = await db.query(statement);
        if(data.length==0){
            return { result: "error" };
        }
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}

async function search_history_by_fullname(fruit) {
    var statement = "SELECT DATE, " + fruit + " FROM predict_table";
    try{
        const data = await db.query(statement, [fruit]);
        if(data.length==0){
            return { result: "error" };
        }
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}

async function search_fruit() {
    var statement = "SELECT * FROM fruit";
    try{
        const data = await db.query(statement, [fruit]);
        if(data.length==0){
            return { result: "error" };
        }
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}

async function search_image_by_fruit(fruit) {
    var statement = "SELECT image FROM fruit WHERE name = (?)";
    try{
        const data = await db.query(statement, [fruit]);
        if(data.length==0){
            return { result: "error" };
        }
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}

module.exports = {
    // add_some_data,
    search_realtime_by_sub,
    search_realtime_by_fullname,
    search_history_by_fullname,
    search_history_by_sub,
    search_fruit,
    search_image_by_fruit
};