const db = require("./db");

async function create_table() {
    await db.query("SET FOREIGN_KEY_CHECKS=0;");
    await db.query("DROP TABLE IF EXISTS Post");
    await db.query("SET FOREIGN_KEY_CHECKS=1;");

    var createStatement =
        "CREATE TABLE Post ( \
        PID INT NOT NULL AUTO_INCREMENT, \
        author VARCHAR(20) NOT NULL, \
        title VARCHAR(40) NOT NULL, \
        fruit VARCHAR(20) NOT NULL, \
        content VARCHAR(255) NOT NULL, \
        PRIMARY KEY(PID) \
        );";
    await db.query(createStatement);
    console.log("Create Post table successfully.");
    var s1 =
        'insert into Post (author,title,fruit,content) values ("Jacky", "DB cool!!!", "banana", "OH wow SO NICE!! I cannot wait to eat it up!!!");';
    await db.query(s1);
    var s2 =
        'insert into Post (author,title,fruit,content) values ("Chris", "DB nono cool!!!", "apple", "ALAHUAGUA!! I cannot wait to eat it up!!!");';
    await db.query(s2);
    console.log("Add 2 Data..");
}
// async function add_some_data() {

// }
async function get_data() {
    var statement = "SELECT * FROM Post;";
    try {
        const data = await db.query(statement);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function insert_data(newData) {
    try {
        const data = await db.query(
            "INSERT INTO Post (author,title,fruit,content) VALUES (?,?,?,?)",
            [newData.author, newData.title, newData.fruit, newData.content]
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
        var statement = "SELECT * FROM Post where PID=(?)";
        const data = await db.query(statement, [PID]);
        const result = "success";
        return { data, result };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}
async function search_data_by_fruit(fruitName) {
    try {
        var statement = "SELECT PID FROM Post where fruit=(?)";
        const data = await db.query(statement, [fruitName]);
        const result = "success";
        return { data, result };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}
async function search_data_by_user(author) {
    try {
        var statement = "SELECT PID FROM Post where author=(?)";
        const data = await db.query(statement, [author]);
        const result = "success";
        return { data, result };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}
async function search_data_by_id_and_update(PID, updateData) {
    try {
        var statement =
            "UPDATE Post SET author=(?),title=(?),fruit=(?),content=(?) WHERE PID=(?)";
        const data = await db.query(statement, [
            updateData.author,
            updateData.title,
            updateData.fruit,
            updateData.content,
            PID,
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
    search_data_by_fruit,
    search_data_by_user,
};
