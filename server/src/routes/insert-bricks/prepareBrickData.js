const colorMap = require("./colorMap");

const prepareBrickData = (legoElements) => {

    let brickData = [];
    const colors = [[999, colorMap[999], 1],];

    legoElements.forEach(legoElement => {

        const { pathname } = new URL(legoElement.imgUrl);
        const urlPathParam = legoElement.imgUrl.split('/');
        let colorId = urlPathParam[4];

        if (colorId === 'noImage.gif') {
            colorId = 1;
        }

        const model_id = legoElement.model_id.replace('(Inv)', '').trim();

        colors.push([
            colorId,
            colorMap[colorId],
            1
        ])

        const imageType = urlPathParam[3];
        if (imageType === 'M') {
            colorId = 999
        }

        brickData.push([
            +colorId,
            'Y910',
            '' + model_id + colorId,
            model_id,
            0.5,
            legoElement.description,
            pathname
        ])
    });

    return {colors, brickData }

}

module.exports = prepareBrickData