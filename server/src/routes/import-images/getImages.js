const fs = require('fs');
const download = require('./download');

const getImages = function (setNumber, jsonString) {
    // let rawData = fs.readFileSync(`jsons_lego/${setNumber}.json`);
    let legoSet = JSON.parse(jsonString);
    const dir = './img';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    legoSet[setNumber].forEach(legoElement => {

        const urlPathParam = legoElement.imgUrl.split('/');
        const colorId = urlPathParam[4];
        const model_id = legoElement.model_id.replace('(Inv)', '').trim();
        const imageType = urlPathParam[3];
        let imgUrl = ''

        if (!fs.existsSync(`img/${imageType}`)) {
            fs.mkdirSync(`img/${imageType}`);
        }

        if (imageType === 'M') {
            imgUrl = `./img/${imageType}/${model_id}.jpg`;
        } else {
            if (!fs.existsSync(`img/${imageType}/${colorId}`)) {
                fs.mkdirSync(`img/${imageType}/${colorId}`);
            }
            imgUrl = `./img/${imageType}/${colorId}/${model_id}.jpg`;
        }

        download(legoElement.imgUrl, imgUrl, function () {
            console.log('done');
        });
    });
};

module.exports = getImages;