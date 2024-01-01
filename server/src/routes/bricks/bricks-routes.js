const express = require('express');
const pgClient = require("../../db_connect");
const router = express.Router();

// /bricks/
router.get('/', async (req, res) => {

        let offset = req.query.offset || 0;
        let limit = req.query.limit || 50;

        console.log(offset, limit);

    const result = await pgClient.query(`
        SELECT
            *
        FROM
            brick
        ORDER BY
            element_id
        LIMIT $1 OFFSET $2;
    `, [limit, offset]);

    res.send({ result });
});

module.exports = router;