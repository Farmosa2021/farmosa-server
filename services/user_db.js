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


    await db.query("DROP TABLE IF EXISTS Favor");
    var createStatement ="CREATE TABLE Favor ( \
        UID INT NOT NULL, \
        fruit VARCHAR(20) NOT NULL, \
        FOREIGN KEY(UID) REFERENCES User(UID) ON DELETE CASCADE \
        );";
    await db.query(createStatement);
    console.log("Create Favor table successfully.");
    var s1 = 'insert into Favor (UID, fruit) values (1, "香蕉");'
    await db.query(s1);
    var s2 = 'insert into Favor (UID, fruit) values (2, "西瓜");'
    await db.query(s2);

    console.log("Add 2 Data to Favor..");
}
// async function add_some_data() {

// }
async function get_data() {
    var statement = "SELECT * FROM User;";
    try {
        const data = await db.query(statement);
        const result = "success"
        return {data, result};
    } catch (err) {
        console.log(err);
        return {result: "error"};
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
        if(data.length==0){
            return { result: "error" };
        }
        const result = "success";
        return {
            data,
            result,
        };
    }catch(err){
        return { result: "error" };
    }

}

async function insert_favor(newData, UID) {
    try {
        const data = await db.query(
            "INSERT INTO Favor (UID, fruit) VALUES (?,?)",
            [UID, newData.fruit]
        );
        return { result: "success" };
    } catch (err) {
        console.log(err);
        return { result: "error" };
    }
}

async function search_favor_by_id(UID) {
    var statement = "SELECT fruit FROM Favor where UID=(?)";
    try{
        const data = await db.query(statement, [UID]);
        if(data.length==0){
            return { result: "error" };
        }
        const result = "success";
        return {
            data,
            result,
        };
    }catch(err){
        return { result: "error" };
    }
}

async function delete_favor(UID, fruit) {
    var statement = "DELETE FROM Favor where UID=(?) AND fruit=(?)";
    try{
        const data = await db.query(statement, [UID, fruit]);
        if(data.length==0){
            return { result: "error" };
        }
        return { result: "success" };
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
        const result = "success";
        return {
            data,
            result,
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
    insert_favor,
    search_favor_by_id,
    auth,
    delete_favor
};
