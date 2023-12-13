const express = require('express');
const pgClient = require("../../db_connect");
const router = express.Router();

const prepareBrickData = require('./prepareBrickData');
const prepareSetsData = require('./prepareSetsData');

const brickValuesCreate = (brickData) => {
    return brickData.map(value => `('${value[0]}', '${value[1]}', '${value[2]}', '${value[3]}', ${value[4]}, $$${value[5]}$$, '${value[6]}' )`);

}

// /insert-bricks/insert-bricks
router.post('/preview-data-to-insert-bricks', (req, res) => {

    const url = req.body.url;
    const setNumber = req.body.setnumber;
    const json = req.body.json || '';
    let legoSetBrickModel = JSON.parse(json);

    const { colors, brickData } = prepareBrickData(legoSetBrickModel[setNumber]);
    const setData = [[legoSetBrickModel[setNumber], legoSetBrickModel["setTitle"], ""]];


    let values = colors.map(value => `('${value[0]}', '${value[1]}', ${value[2]})`);

    const insertColorQuery = `
        INSERT INTO color_exact (color_exact_id, name, color_family_id) 
        VALUES ${values}
        ON CONFLICT DO NOTHING; 
    `;

    let brickValues = brickValuesCreate(brickData);

    const brickQuery = `INSERT INTO brick (color_exact_id, category, element_id, model_id, price, description, img_pathname) 
        VALUES ${brickValues}
        ON CONFLICT DO NOTHING; `;

    const setQuery = `
        INSERT INTO lego_sets (set_number, name, description) 
        VALUES ('${setNumber}', $$${legoSetBrickModel["setTitle"]}$$, '')
        ON CONFLICT DO NOTHING; 
        `;

    // set_number VARCHAR(20) NOT NULL,
    // element_id VARCHAR(20) NOT NULL,
    // quantity INT,
    // quantity_in_set INT,


   

    const setPartData = prepareSetsData(legoSetBrickModel[setNumber], setNumber);

    const setPartsValues = setPartData.map(value => `('${value[0]}', '${value[1]}', ${value[2]})`);

    const setPartsQuery = `INSERT INTO lego_set_parts (set_number, element_id, quantity) VALUES ${setPartsValues} ON CONFLICT DO NOTHING;`;

    res.send({
        setPartData,
        setQuery,
        brickQuery,
        colors: values,
    });
});


// /insert-bricks/insert-bricks
router.post('/insert-bricks', (req, res) => {

    const url = req.body.url;
    const setNumber = req.body.setnumber;
    const json = req.body.json || '';

    let legoSetBrickModel = JSON.parse(json);
    const { colors, brickData } = prepareBrickData(legoSetBrickModel[setNumber]);

    const setData = [[legoSetBrickModel["setNumber"], legoSetBrickModel["setTitle"], ""]];

    let colorsValues = colors.map(value => `('${value[0]}', '${value[1]}', ${value[2]})`);

    const insertColorQuery = `
        INSERT INTO color_exact (color_exact_id, set_name, color_family_id) 
        VALUES ${colorsValues}
        ON CONFLICT DO NOTHING; 
    `;

    pgClient
        .query(insertColorQuery)
        .catch((err) => {
            res.send({ INSERT: err });
        });

    let brickValues = brickValuesCreate(brickData);

    const brickQuery = ` INSERT INTO brick (color_exact_id, category, element_id, model_id, price, description, img_pathname) 
            VALUES ${brickValues}
            ON CONFLICT DO NOTHING; `;

    pgClient
        .query(brickQuery)
        .catch((err) => {
            res.send({ INSERT: err });
        });

    const setQuery = `INSERT INTO lego_sets (set_number, set_name, description) VALUES ('${setNumber}', $$${legoSetBrickModel["setTitle"]}$$, '') ON CONFLICT DO NOTHING;`;

    pgClient
        .query(setQuery)
        .catch((err) => {
            res.send({ INSERT: err });
        });

});

module.exports = router;