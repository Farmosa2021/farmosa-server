const db = require('./db');

async function getFruits(){
  const data = await db.query('SELECT * FROM Fruit');
  const meta = {'fruits_num': data.length};

  return {
    data,
    meta
  }
}

module.exports = {
    getFruits
}