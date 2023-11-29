'use strict';
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const createLegoSetJson = function (url, setNumber, res) {
    rp(url)
        .then(function (html) {
            //success! 
            let $ = cheerio.load(html);
            const legoElements = [];
            console.log($('.IV_ITEM').length);
            $('.IV_ITEM').each(function (i, elm) {
                legoElements.push({
                    quantity: $(elm).children().eq(1).text().trim(),
                    model_id: $(elm).children().eq(2).text().trim(),
                    description: $(elm).children().eq(3).text(),
                    imgUrl: $(elm).children().eq(0).find('img').attr('src')
                })
            })
            let setTitle = $('TABLE tr td center font b').eq(0).text()
            let data = `{ 
                "${setNumber}": ${JSON.stringify(legoElements, null, 2)},
                "setNumber" : "${setNumber}",
                "setTitle" : "${setTitle}"
            }`;
            res.send({ url, setNumber, data });
            // fs.writeFileSync(`jsons_lego/jsons_lego_temp/${setNumber}.json`, data);
        })
        .catch(function (err) {
            //handle error
        });
}
module.exports = createLegoSetJson;