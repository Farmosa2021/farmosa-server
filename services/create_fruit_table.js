const db = require("./db");

async function create_fruit_table() {
    await db.query("DROP TABLE IF EXISTS fruit;")
	var createStatament = "CREATE TABLE IF NOT EXISTS fruit( \
		ID int NOT NULL AUTO_INCREMENT, \
		name varchar(20), \
		image varchar(128), \
		PRIMARY KEY (ID) \
		)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" 
	await db.query(createStatament);
	
    await db.query("DROP TABLE IF EXISTS fruit_season;")
	var createStatament = "CREATE TABLE IF NOT EXISTS fruit_season( \
		fruit varchar(20) NOT NULL, \
		season_start DATE, \
		season_end DATE, \
		PRIMARY KEY (fruit) \
		)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" 
	await db.query(createStatament);

    var fs  = require("fs");
    var array = fs.readFileSync('./data/we.txt').toString().split('\n');
    for(var i = 0; i < 23; i++){
        var name = array[i],
            image = array[i+24];
        var insertStatement = "INSERT INTO fruit(name, image) values(?, ?)";
        var item = [name, image];    
        await db.query(insertStatement, item);
    } 
    // var check = "SELECT * FROM fruit;"
    // const res = await db.query(check);
    // console.log(res)  
}

module.exports = {
	create_fruit_table,
};