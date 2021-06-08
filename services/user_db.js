const db = require("./db");

async function create_table() {
    await db.query("SET FOREIGN_KEY_CHECKS=0;");
    await db.query("DROP TABLE IF EXISTS User");
    await db.query("SET FOREIGN_KEY_CHECKS=1;");

    var createStatement =
        "CREATE TABLE User ( \
        UID INT NOT NULL AUTO_INCREMENT UNIQUE, \
        username VARCHAR(20) NOT NULL UNIQUE, \
        password VARCHAR(40) NOT NULL, \
        PRIMARY KEY(UID) \
        );";
    await db.query(createStatement);
    console.log("Create User table successfully.");
    var s1 =
        'insert into User (username, password) values ("Jacky", "waterso0910");';
    await db.query(s1);
    var s2 = 'insert into User (username, password)  values ("Chris", "bpploabc");';
    await db.query(s2);
    console.log("Add 2 Data to User..");
}
// async function add_some_data() {

// }
async function get_data() {
    var statement = "SELECT * FROM User;";
    try {
        const data = await db.query(statement);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function insert_data(newData) {
    try {
        const data = await db.query(
            "INSERT INTO User (username, password) VALUES (?,?)",
            [newData.username, newData.password]
        );
        return { result: "success" };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}
async function search_data_by_id(UID) {
    var statement = "SELECT * FROM User where UID=(?)";
    try{
        const data = await db.query(statement, [UID]);
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        return { result: "error" };
    }

}

async function auth(authUser) {
    var statement = "SELECT * FROM User where username=(?) AND password=(?)";
    try{
        const data = await db.query(statement, [authUser.username, authUser.password]);
        if(data.length==0){
            return { result: "error" };
        }
        const response = { result: "success" };
        return {
            data,
            response,
        };
    }catch(err){
        console.log(err)
        return { result: "error" };
    }
}
module.exports = {
    // add_some_data,
    create_table,
    get_data,
    insert_data,
    search_data_by_id,
    auth
};