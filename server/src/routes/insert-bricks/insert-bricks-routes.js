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


    let values  = colors.map(value => `('${value[0]}', '${value[1]}', ${value[2]})` );

    const insertColorQuery = `
    INSERT INTO color_exact (color_exact_id, name, color_family_id) 
    VALUES ${values}
    ON CONFLICT DO NOTHING; 
    `;


    res.send({ brickData, colors, setData, insertColorQuery });
});


// /insert-bricks/insert-bricks
router.post('/insert-bricks', (req, res) => {

    const url = req.body.url;
    const setNumber = req.body.setnumber;
    const json = req.body.json || '';

    let legoSetBrickModel = JSON.parse(json);
    const { colors, brickData } = prepareBrickData(legoSetBrickModel[setNumber]);

    const setData = [[legoSetBrickModel["setNumber"], legoSetBrickModel["setTitle"], ""]];


    // connection.query(brickQuery, [brickData], function (error, result) {
    //     if (error) {
    //         console.log('this.sql', this.sql); //command/query
    //         console.log(error);
    //     }
    // });

    let values  = colors.map(value => `('${value[0]}', '${value[1]}', ${value[2]})` );

    const insertColorQuery = `
    INSERT INTO color_exact (color_exact_id, name, color_family_id) 
    VALUES ${values}
    ON CONFLICT DO NOTHING; 
    `;

    console.log(insertColorQuery);

    pgClient
        .query(insertColorQuery)
        .catch((err) => {
            res.send({ INSERT: err });
        });

    res.send({ insertColorQuery });
});

module.exports = router;