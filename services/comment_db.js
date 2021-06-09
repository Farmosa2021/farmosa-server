const db = require("./db");

async function create_table() {
    await db.query("DROP TABLE IF EXISTS Comment");
    var createStatement =
        "CREATE TABLE Comment ( \
        CID INT NOT NULL AUTO_INCREMENT, \
        PID INT NOT NULL, \
        author VARCHAR(20) NOT NULL, \
        content VARCHAR(255) NOT NULL, \
        time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \
        PRIMARY KEY(CID), \
        FOREIGN KEY(PID) REFERENCES Post(PID) ON DELETE CASCADE \
        );";
    await db.query(createStatement);
    console.log("Create Comment table successfully.");
    var s1 =
        'insert into Comment (author,content,PID) values ("Kuku", "Fxck alcohol!!", 1);';
    await db.query(s1);
    var s2 =
        'insert into Comment (author,content,PID) values ("Chris Paul", "Gang la!!!", 2);';
    await db.query(s2);
    var s3 =
        'insert into Comment (author,content,PID) values ("Masa", "Hakunamatata!", 2);';
    await db.query(s3);
    console.log("Add 3 Data..");
}
// async function add_some_data() {

// }
async function get_data() {
    var statement = "SELECT * FROM Comment;";
    try {
        const data = await db.query(statement);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function insert_data(newData, PID) {
    try {
        const data = await db.query(
            "INSERT INTO Comment (PID,author,content) VALUES (?,?,?)",
            [PID, newData.author, newData.content]
        );
        const result = "success";
        return { data, result };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}
async function search_data_by_id(PID) {
    try {
        var statement = "SELECT * FROM Comment where PID=(?)";
        const data = await db.query(statement, [PID]);
        const result = "success";
        return { data, result };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}
async function search_data_by_id_and_update(PID, CID, updateData) {
    try {
        var statement =
            "UPDATE Comment SET author=(?),content=(?) WHERE PID=(?) AND CID=(?)";
        const data = await db.query(statement, [
            updateData.author,
            updateData.content,
            PID,
            CID,
        ]);
        const result = "success";
        return { data, result };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}
module.exports = {
    // add_some_data,
    create_table,
    get_data,
    insert_data,
    search_data_by_id,
    search_data_by_id_and_update,
};
