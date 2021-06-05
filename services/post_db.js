const db = require("./db");

async function create_table() {

    await db.query("DROP TABLE IF EXISTS Post");
    var createStatement ="CREATE TABLE Post ( \
        PID INT NOT NULL AUTO_INCREMENT, \
        author VARCHAR(20) NOT NULL, \
        title VARCHAR(40) NOT NULL, \
        fruit VARCHAR(10) NOT NULL, \
        content VARCHAR(255) NOT NULL, \
        PRIMARY KEY(PID) \
        );";
    await db.query(createStatement);
    console.log("Create Post table successfully.");
    var s1 = 'insert into Post (author,title,fruit,content) values ("Jacky", "DB cool!!!", "banana", "OH wow SO NICE!! I cannot wait to eat it up!!!");'
    await db.query(s1);
    var s2 = 'insert into Post (author,title,fruit,content) values ("Chris", "DB nono cool!!!", "apple", "ALAHUAGUA!! I cannot wait to eat it up!!!");'
    await db.query(s2);
    console.log("Add 2 Data..");
}
// async function add_some_data() {

// }
async function get_data() {
    var statement = "SELECT * FROM Post;";
    try{
        const data = await db.query(statement);
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        return err
    }
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
    const data = await db.query(statement, [PID]);
    return data;
}
async function search_data_by_id_and_update(PID, updateData) {
    var statement = "UPDATE Post SET(?) WHERE PID=(?)";
    const data = await db.query(statement, [JSON.stringify(updateData), PID]);
    return data;
}
module.exports = {
    // add_some_data,
    create_table,
    get_data,
    insert_data,
    search_data_by_id,
    search_data_by_id_and_update
};
