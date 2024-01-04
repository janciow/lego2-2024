const express = require('express');
const pgClient = require("../../db_connect");
const router = express.Router();

// /sets/
router.get('/', async (req, res) => {

    let offset = req.query.offset || 0;
    let limit = req.query.limit || 50;

    console.log(offset, limit);

    const result = await pgClient.query(`
        SELECT * 
        FROM public.lego_sets
        ORDER BY set_number ASC 
        LIMIT $1 OFFSET $2;
    `, [limit, offset]);

    res.send({ result });
});

// /sets/:setId
router.get('/:setId', async (req, res) => {
    const { setId } = req.params;
    const result = await pgClient.query(`
        SELECT * FROM lego_set_parts
        WHERE set_number = $1
        ORDER BY set_number ASC, element_id ASC
`, [setId]);

    res.send({ result });
});

module.exports = router;