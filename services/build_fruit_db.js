const request = require("request");
const cheerio = require("cheerio");
const db = require("./db");

async function getFruitName() {
    var name_query = "SELECT DISTINCT item FROM price_query;";
    const data = await db.query(name_query);

    const meta = { res_num: data.length };
    return {
        data,
        meta,
    };
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    while (1) {
        if (new Date().getTime() - start > milliseconds) 
            break;
    }
}

async function imageCrawler() {
    var res = await getFruitName();
    // console.log(res.data)
    for (var i in res.data) {
        // sleep(100);
        console.log(res.data[i].item);
        var fruit_name = res.data[i].item.toString("utf8");
        var imageUrl =
            "https://www.google.com/search?q=" +
            fruit_name +
            "&bih=917&biw=1667&hl=zh-TW&sxsrf=ALeKk03vWvGzSXWcc3iIULrrgYJx83aQNw:1622815113450&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiX3_2ykf7wAhVLBKYKHfb3BIAQ_AUoAXoECAIQAw&cshid=1622815194229947";
        request(
            {
                url: encodeURI(imageUrl),
                method: "GET",
            },
            (error, res, body) => {
                // 如果有錯誤訊息，或沒有 body(內容)，就 return
                if (error || !body) {
                    console.log("err: ", error);
                    return;
                }
                console.log(body);
                const data = [];
                const $ = cheerio.load(body); // 載入 body
                const list = $(".bRMDJf");
                console.log(list);
                for (let i = 0; i < list.length; i++) {
                    // const title = list.eq(i).find(".title a").text();
                    // const author = list.eq(i).find(".meta .author").text();
                    // const date = list.eq(i).find(".meta .date").text();
                    const link = list.eq(i).find("img").attr("src");
                    console.log(link);
                    // data.push({ title, author, date, link });
                }

                // console.log(data);
            }
        );
        break;
    }
}

module.exports = {
    imageCrawler,
};
