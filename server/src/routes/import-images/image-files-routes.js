const express = require('express');
const pgClient = require("../../db_connect");
const router = express.Router();

const getImages = require("./getImages");

// /image-files/list
router.get('/list', async (req, res) => {
    const result = await pgClient.query(`
        select * from data_source;
    `, []);

    console.log('dddd fff fsdsf')
    res.send({ result: result.rows, test: 'ok' });
});

// /image-files/import
router.post('/import', async (req, res) => {
    const setNumber = req.body.setNumber;
    const jsonSring = req.body.jsonSring;
    const data = await getImages(setNumber, jsonSring);
    res.send({ result: 'ok oj ojj' });
})

module.exports = router;