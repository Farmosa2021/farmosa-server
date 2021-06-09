// Importing mysql and csvtojson packages
// Requiring module
const db = require('./db');

async function update() {
    await db.query("DROP TABLE IF EXISTS predict_table");
    var createStatament = "CREATE TABLE predict_table ( \
        時間 DATE not null, \
        洋蔥 FLOAT, \
        香蕉 FLOAT, \
        鳳梨 FLOAT, \
        蒜頭 FLOAT, \
        青梅 FLOAT, \
        木瓜 FLOAT, \
        柳橙 FLOAT, \
        椪柑 FLOAT, \
        蓮霧 FLOAT, \
        棗子 FLOAT, \
        新興梨 FLOAT, \
        檸檬 FLOAT, \
        芒果 FLOAT, \
        豐水梨 FLOAT, \
        番石榴 FLOAT, \
        文旦 FLOAT, \
        甜柿 FLOAT, \
        桶柑 FLOAT, \
        紅龍果 FLOAT, \
        甘藍 FLOAT, \
        結球白菜 FLOAT, \
        茂谷柑 FLOAT, \
        西瓜 FLOAT, \
        PRIMARY KEY(時間) \
        )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    await db.query(createStatament);

    // Creating table "predict_table"
    // var loadStatement = "load data local infile '../data/predict_table.csv' \
    // into table predict_table  \
    // fields terminated by ',' \
    // enclosed by '\"' \
    // lines terminated by '\\n' \
    // ignore 1 lines;";
    
    // await db.query(loadStatement);
    await db.load_query('./data/history_price.csv');

    console.log("Update predict table successfully.");
}

module.exports = {
    update
}