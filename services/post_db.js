const db = require("./db");

async function create_table() {
    await db.query("DROP TABLE IF EXISTS Post");
    var createStatement =
        "CREATE TABLE Post ( \
        author VARCHAR(20), \
        title VARCHAR(40), \
        fruit VARCHAR(10), \
        content VARCHAR(255), \
        PRIMARY KEY(PID) \
        )";
    await db.query(createStatement);

    console.log("Create Post table successfully.");
}
async function get_data() {
    var statement = "SELECT * FROM Post";
    const data = await db.query(statement);
    return data
}
async function insert_data(newData) {
    const data = await db.query(
        "INSERT INTO Post VALUES(?)",
        JSON.stringify(newData)
    );
    return data;
}
async function search_data_by_id(PID) {
    var statement = "SELECT * FROM Post where PID=(?)";
    const data = await db.query(statement, PID);
    return data;
}
async function search_data_by_id_and_update(PID, updateData) {
    var statement = "UPDATE Post SET(?)";
    const data = await db.query(statement, JSON.stringify(updateData));
    return data;
}
module.exports = {
    create_table,
    get_data,
    insert_data,
    search_data_by_id,
    search_data_by_id_and_update
};
