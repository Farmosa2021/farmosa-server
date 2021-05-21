const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);
const fs = require('fs');

async function query(sql, params) {
  [rows ,fields] = await pool.execute(sql, params);
  return rows;
}

async function load_query(localFileToImport) {
  await pool.query({
    sql: `LOAD DATA LOCAL INFILE "${localFileToImport}"into table predict_table  \
        fields terminated by ',' \
        enclosed by '\"' \
        lines terminated by '\\n' \
        ignore 1 lines;`,
   values: [],
   infileStreamFactory: () => fs.createReadStream(localFileToImport)  // <======
  });
}

module.exports = {
  query,
  load_query
}