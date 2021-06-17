import pymysql
import urllib.request
import json

url = 'https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx'

def response(url):
    with urllib.request.urlopen(url) as response:
        return response.read()

res = response(url)
data = json.loads(res)

db = pymysql.connect(host = "localhost", user = "root", password = "", database = "Farmosa", local_infile = True)

cursor = db.cursor()
cursor.execute("DROP TABLE IF EXISTS price_query")

sql = """
CREATE TABLE `price_query`(
    `date` DATE not null,
    `item` VARCHAR(30) not null,
    `market` VARCHAR(10) not null,
    `high_price` FLOAT,
    `mid_price` FLOAT,
    `low_price` FLOAT,
    `avg_price` FLOAT,
    `amount` FLOAT
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"""

cursor.execute(sql)

for d in data:
    # if d['種類代碼'] == 'N05' and d['種類代碼'] == 'N06':
    #     if d['作物名稱'] != '其他蔬菜':
    date = d['交易日期'].split('.')
    date[0] = str(int(date[0]) + 1911)
    DATE = date[0] + '-' + date[1] + '.' + date[2]
    # print(d['交易日期'])
    info = [DATE, d['作物名稱'], d['市場名稱'], d['上價'], d['中價'], d['下價'], d['平均價'], d['交易量']]
    cursor.execute("INSERT INTO price_query (date, item, market, high_price, mid_price, low_price, avg_price, amount) VALUE(%s, %s, %s, %s, %s, %s, %s, %s)", info)
    db.commit()
# db.commit()

