const prepareSetsData = (legoElements, setNumber) => {

    let brickSetData = [];
    // const colors = [[999, colorMap[999], 1],];

    legoElements.forEach(legoElement => {

        const urlPathParam = legoElement.imgUrl.split('/');
        let colorId = urlPathParam[4];
        const model_id = legoElement.model_id.replace('(Inv)', '').trim();


        const imageType = urlPathParam[3];
        if (imageType === 'M') {
            colorId = 999
        }


        brickSetData.push([
            setNumber,
            '' + model_id + colorId,
            +legoElement.quantity
        ])
    });

    return brickSetData

}

module.exports = prepareSetsData