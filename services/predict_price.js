const db = require('./db');

async function getPredictPrice(date){
  const data = await db.query('SELECT * FROM predict_table WHERE 時間=' + date);
  const meta = {'length': data.length};

  return {
    data,
    meta
  }
}

async function getPredictPrices(from_date, to_date){
  const data = await db.query('SELECT * FROM predict_table WHERE 時間>=' + from_date + 'AND 時間<=' + to_date + 'ORDER BY 時間 ASC');
  const meta = {'length': data.length};

  return {
    data,
    meta
  }
}

module.exports = {
  getPredictPrice,
  getPredictPrices
}