import pymysql

db = pymysql.connect(host = "localhost", user = "root", password = "", database = "Farmosa", local_infile = True)

cursor = db.cursor()
cursor.execute("DROP TABLE IF EXISTS predict_table")

sql = """CREATE TABLE `predict_table` (
    `時間` DATE not null,
    `洋蔥` FLOAT,
    `青香蕉` FLOAT,
    `鳳梨` FLOAT,
    `蒜頭` FLOAT,
    `青梅` FLOAT,
    `木瓜` FLOAT,
    `柳橙` FLOAT,
    `椪柑` FLOAT,
    `蓮霧` FLOAT,
    `棗子` FLOAT,
    `新興梨` FLOAT,
    `檸檬` FLOAT,
    `芒果` FLOAT,
    `豐水梨` FLOAT,
    `番石榴` FLOAT,
    `文旦` FLOAT,
    `甜柿` FLOAT,
    `桶柑` FLOAT,
    `紅龍果` FLOAT,
    `甘藍` FLOAT,
    `結球白菜` FLOAT,
    `茂谷柑` FLOAT,
    `西瓜` FLOAT,
    PRIMARY KEY(`時間`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"""

cursor.execute(sql)

sql = """load data local infile './predict_table.csv'
into table predict_table
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 lines;"""

cursor.execute(sql)

db.commit()
