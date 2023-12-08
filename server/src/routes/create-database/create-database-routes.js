const express = require('express');
const pgClient = require("../../db_connect");
const router = express.Router();

// /create-database/create-color-family-table
router.post('/create-color-family-table', (req, res) => {
    pgClient.query(`
      CREATE TABLE IF NOT EXISTS color_family (
        id  SERIAL,
        name varchar(100) UNIQUE,
        PRIMARY KEY (id)
    );
      `)
        .catch((err) => {
            res.setHeader('Content-Type', 'text/html');
            res.send({ INSERT: err });
        });

    res.send({ INSERT: true });
});

// INSERT ... ON CONFLICT DO NOTHING/UPDATE
// /create-database/insert-colors-family
router.post('/insert-colors-family', (req, res) => {
    pgClient.query(`
    INSERT INTO color_family (name) 
    VALUES ('Black'),
              ('Blue'),
              ('Brown'),
              ('Bright Orange'),
              ('Dark Green'),
              ('Grey'),
              ('Lilac'),
              ('Purple'),
              ('Red'),
              ('Reddish Brown'),
              ('Silver'),
              ('Warm Gold'),
              ('White'),
              ('Yellow')
      ON CONFLICT DO NOTHING; 
      `)
        .catch((err) => {
            res.setHeader('Content-Type', 'text/html');
            res.send({ INSERT: err });
        });

    res.send({ INSERT: 'ok' });
});

// /create-database/color-family
router.get('/color-family', async (req, res) => {
    const result = await pgClient.query(`
        select * from color_family;
    `, []);
    res.send({ result: result.rows });
});

// /create-database/create-color-exact-table
router.post('/create-color-exact-table', (req, res) => {
    pgClient.query(`
    CREATE TABLE IF NOT EXISTS color_exact(
        color_exact_id  VARCHAR(16) UNIQUE,
        name VARCHAR(100) UNIQUE,
        color_family_id INT,
        PRIMARY KEY (color_exact_id),
        CONSTRAINT fk_color_family
          FOREIGN KEY(color_family_id) 
            REFERENCES color_family(id)
      );
      `)
        .catch((err) => {
            res.setHeader('Content-Type', 'text/html');
            res.send({ INSERT: err });
        });

    res.send({ CREATE: 'ok' });
});




// /create-database/color-exact
router.get('/color-exact', async (req, res) => {
    const result = await pgClient.query(`
        select * from color_exact;
    `, []);
    res.send({ result: result.rows });
});

// /create-database/create-brick-table
router.post('/create-brick-table', (req, res) => {
    pgClient.query(`
    CREATE TABLE IF NOT EXISTS brick(
          element_id VARCHAR(16) UNIQUE,
          color_exact_id INT,
          category VARCHAR(100),
          model_id VARCHAR(10),
          price DECIMAL(8, 2),
          description VARCHAR(200),
          img_pathname VARCHAR(200),
          quantity_free_bricks INT,
          quantity_total INT,
        PRIMARY KEY (element_id),
        CONSTRAINT fk_color_exact
              FOREIGN KEY(color_exact_id) 
                  REFERENCES color_exact(color_exact_id)
    );
      `)
        .catch((err) => {
            res.setHeader('Content-Type', 'text/html');
            res.send({ INSERT: err });
        });

    res.send({ CREATE: 'ok' });
});


module.exports = router;