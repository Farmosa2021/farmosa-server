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
        'insert into Post (author,title,fruit,content) values ("Chris", "DB cool!!!", "鳳梨", "鳳梨是原產於南美洲的熱帶水果，為禾本目鳳梨科鳳梨屬植物，因多汁酸甜受到喜愛，有解暑之效，是鳳梨科中最具經濟價值的種類。");';
    await db.query(s1);
    var s2 =
        'insert into Post (author,title,fruit,content) values ("Chris", "Believe it!!!", "洋蔥", "洋蔥，又稱蔥頭、洋蒜，新疆人稱皮牙孜、是一種常見的石蒜科蔥屬植物");';
    await db.query(s2);
    var s3 =
    'insert into Post (author,title,fruit,content) values ("Chris", "bang!!!", "桶柑", "桶柑，又稱為年柑，是柑橘的一種，屬於芸香科植物，據推測是椪柑與臍橙之天然雜交種。。早年由於農家將桶柑儲藏於木桶中作運輸，故稱之為桶柑。");';
    await db.query(s3);
    var s4 =
    'insert into Post (author,title,fruit,content) values ("Chris", "Dmonn!!!", "蒜頭", "沙威瑪是一道中東黎凡特地區的肉類料理，沙威瑪含有羊肉、雞肉、火雞肉、牛肉，置於烤肉叉上燒烤");';
    await db.query(s4);
    var s5 =
    'insert into Post (author,title,fruit,content) values ("Chris", "sususususu!!!", "柳橙", "橙是芸香科柑橘屬的物種，亦稱為柳橙、黃果、金環。橙是柑果，也是人類種植了很久的混合品種");';
    await db.query(s5);
    console.log("Add 5 Data..");
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
