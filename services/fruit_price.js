const db = require("./db");

async function getFruitData(date_start, date_end, item, market) {
    var price_query =
        "SELECT * FROM price_query where (date BETWEEN '" +
        date_start +
        "' AND '" +
        date_end +
        "') AND item ='" +
        item +
        "' AND market = '" +
        market +
        "';";
    const res = await db.query(price_query);
    var data = JSON.stringify(res);
    const meta = { res_num: data.length };
    return {
        data,
        meta,
    };
}

module.exports = {
    getFruitData,
};
