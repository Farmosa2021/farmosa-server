const db = require("./db");

async function search_realtime_by_sub(fruit, market) {
    var statement = "SELECT * FROM price_query where item LIKE '%" + fruit + "%' and market LIKE '%" + market + "%'";
    if (fruit == '' && market == '') {
        statement = "SELECT * FROM price_query LIMIT 10";
    }
    else if (fruit !='' && market == '') {
        statement = "SELECT * FROM price_query WHERE item LIKE '%" + fruit + "%'";
    }

    else if (fruit == '' && market != '') {
        statement = "SELECT * FROM price_query WHERE market LIKE '%" + market +"%'";
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

    var statement = "SELECT * FROM price_query where item = '" + fruit + "' and market = '" + market+"'";
    if (fruit == '' && market == '') {
        statement = "SELECT * FROM price_query LIMIT 10";
    }
    else if (fruit != '' && market == '') {
        statement = "SELECT * FROM price_query WHERE item = '" + fruit + "'";
    }

    else if (fruit == '' && market != '') {
        statement = "SELECT * FROM price_query WHERE market = '" + market+"'";
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

async function get_all_markets() {

    var statement = "SELECT DISTINCT market FROM price_query";

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
    if (fruit==''){
        statement = "SHOW COLUMNS FROM predict_table";
    }
    console.log(statement)

    name_list = await db.query(statement);
    console.log(name_list)
    var columns = "時間";
    for (var i = 0; i < name_list.length; i++){
        console.log("'"+name_list[i].Field+"'")
        
        if(name_list[i].Field=='時間'){
            continue
        }
        columns += (", " +name_list[i].Field)
    }
    console.log("'"+columns+"'")
    // columns = columns.slice(0, -2)  
    // console.log("'"+columns+"'")
    try{
        statement = "SELECT " + columns + " FROM predict_table"
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
    var statement = "SHOW COLUMNS FROM predict_table LIKE '" + fruit + "'";
    if (fruit==''){
        statement = "SHOW COLUMNS FROM predict_table";
    }
    console.log(statement)

    name_list = await db.query(statement);
    if(name_list.length==0){
        return { result: "error" };
    }
    console.log(name_list)
    var columns = "時間";
    for (var i = 0; i < name_list.length; i++){
        console.log("'"+name_list[i].Field+"'")
        
        if(name_list[i].Field=='時間'){
            continue
        }
        columns += (", " +name_list[i].Field)
    }
    console.log("'"+columns+"'")
    // columns = columns.slice(0, -2)  
    // console.log("'"+columns+"'")
    try{
        statement = "SELECT " + columns + " FROM predict_table"
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

async function search_fruit() {
    var statement = "SELECT * FROM fruit";
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
    search_image_by_fruit,
    get_all_markets
};