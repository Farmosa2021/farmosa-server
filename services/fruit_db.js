const db = require("./db");

async function search_realtime_by_sub(fruit, market) {
    var statement = "SELECT * FROM price_query where item LIKE '%" + fruit + "%' and market = " + market;
    if (fruit == '' && market == '') {
        statement = "SELECT * FROM price_query LIMIT 10";
    }
    else if (fruit !='' && market == '') {
        statement = "SELECT * FROM price_query WHERE item LIKE '%" + fruit + "%'";
    }

    else if (fruit == '' && market != '') {
        statement = "SELECT * FROM price_query WHERE market = " + market; 
    }
    try{
        const data = await db.query(statement);
        if(data.length==0){
            return { result: "error" };
        }
        const result = "success";
        return {
            data,
            result,
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
            return { result: "no result" };
        }
        const result =  "success" ;
        return {
            data,
            result,
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
        const result =  "success" ;
        return {
            data,
            result,
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
    var columns = "時間";
    for (var i = 0; i < name_list.length; i++){
        console.log("'"+name_list[i].Field+"'")
        
        if(name_list[i].Field=='時間'){
            continue
        }
        columns += (", " +name_list[i].Field)
    }
    try{
        statement1 = "SELECT " + columns + " FROM predict_table WHERE 時間 between '2021-01-28' AND '2021-04-28'"
        statement2 = "SELECT " + columns + " FROM predict_table WHERE 時間 between '2020-11-28' AND '2021-04-28'"
        statement3 = "SELECT " + columns + " FROM predict_table WHERE 時間 between '2020-04-28' AND '2021-04-28'"
        const data_6 = await db.query(statement3);
        const data_3 = await db.query(statement2);
        const data_1 = await db.query(statement1);
        if(data_6.length==0 || data_3.length==0 ||data_1.length==0 ){
            return { result: "error" };
        }
        const result = "success";
        return {
            data: {data_6, data_3, data_1},
            result,
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
        statement1 = "SELECT " + columns + " FROM predict_table WHERE 時間 between '2021-01-28' AND '2021-04-28'"
        statement2 = "SELECT " + columns + " FROM predict_table WHERE 時間 between '2020-11-28' AND '2021-04-28'"
        statement3 = "SELECT " + columns + " FROM predict_table WHERE 時間 between '2020-04-28' AND '2021-04-28'"
        const data_6 = await db.query(statement3);
        const data_3 = await db.query(statement2);
        const data_1 = await db.query(statement1);
        if(data_6.length==0 || data_3.length==0 ||data_1.length==0 ){
            return { result: "error" };
        }
        const result = "success";
        return {
            data: {data_6, data_3, data_1},
            result,
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
        const result = "success";
        return {
            data,
            result,
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
        const result = "success";
        return {
            data,
            result,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}

async function get_fruit_season(fruit) {
    var statement = "SELECT * FROM fruit_season where fruit = (?)";

    try{
        const data = await db.query(statement, [fruit]);
        if(data.length==0){
            return { result: "error" };
        }
        const result =  "success" ;
        return {
            data,
            result,
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
    get_all_markets,
    get_fruit_season
};