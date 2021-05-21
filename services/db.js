const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  await pool.execute(sql, params).then(([rows,fields]) => {
    return rows;
  });
}

module.exports = {
  query
}