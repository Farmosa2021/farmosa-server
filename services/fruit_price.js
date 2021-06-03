const db = require("./db");

async function getFruitData(date_start, date_end, item, market) {
    var price_query =
        "SELECT * FROM price_query where (date BETWEEN " +
        date_start +
        " AND " +
        date_end +
        ") AND item =" +
        item +
        " AND market = " +
        market +
        ";";
    await db.query(price_query, function (err, res) {
        if (err) {
            throw err;
        }
        var data = JSON.stringify(res);
        const meta = { res_num: data.length };
        return {
            data,
            meta,
        };
    });

}

module.exports = {
    getFruitData,
};
