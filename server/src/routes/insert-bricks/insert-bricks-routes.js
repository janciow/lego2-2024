const express = require('express');
const pgClient = require("../../db_connect");
const router = express.Router();

const prepareBrickData = require('./prepareBrickData');

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

    let brickValues = brickData.slice(180, 190).map(value => `('${value[0]}', '${value[1]}', '${value[2]}', '${value[3]}', ${value[4]}, $$${value[5]}$$, '${value[6]}' )`);

    const brickQuery = `INSERT INTO brick (color_exact_id, category, element_id, model_id, price, description, img_pathname) 
        VALUES ${brickValues}
        ON CONFLICT DO NOTHING; `;

    res.send({ insertColorQuery, brickQuery });
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
        INSERT INTO color_exact (color_exact_id, name, color_family_id) 
        VALUES ${colorsValues}
        ON CONFLICT DO NOTHING; 
    `;

    pgClient
        .query(insertColorQuery)
        .catch((err) => {
            res.send({ INSERT: err });
        });

    console.log(brickData.length)

    let brickValues = brickData.map(value => `('${value[0]}', '${value[1]}', '${value[2]}', '${value[3]}', ${value[4]}, $$${value[5]}$$, '${value[6]}' )`);

    const brickQuery = `INSERT INTO brick (color_exact_id, category, element_id, model_id, price, description, img_pathname) 
            VALUES ${brickValues}
            ON CONFLICT DO NOTHING; `;

    pgClient
        .query(brickQuery)
        .catch((err) => {
            res.send({ INSERT: err });
        });


    res.send({ brickQuery });
});

module.exports = router;