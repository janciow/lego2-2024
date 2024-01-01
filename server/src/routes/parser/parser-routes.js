const express = require('express');
const pgClient = require("./../../db_connect");
const createLegoSetJson = require("./createLegoSetJson");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  next()
})


// /parser/create-links-table
router.post('/create-links-table', (req, res) => {
  pgClient.query(`
    DROP TABLE IF EXISTS public.data_source;
    CREATE TABLE IF NOT EXISTS data_source (
        id  SERIAL,
        url varchar(200),
        json TEXT,
        setNumber varchar(10) UNIQUE,
        PRIMARY KEY (id)
    )`)
    .catch((err) => {


      console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.send({ INSERT: err });
    } );

  res.send({ INSERT: true });
});

// /parser/insert-json-to-db
router.post('/insert-json-to-db', async (req, res) => {
    const url = req.body.url;
    const setNumber = req.body.setNumber;
    const json = req.body.json || '';

    if (url && setNumber) {
      const result = await pgClient.query(`
      INSERT INTO data_source (url, setnumber, json) 
        VALUES ($1, $2, $3)
          ON CONFLICT (setnumber) DO UPDATE 
          SET url = excluded.url, 
              json = excluded.json, 
              setnumber = excluded.setnumber;
      `, [url, setNumber, json]);
      res.send({ result });
    } else {
        res.send({ err: 'no data' });
    }
})

// /parser/creat-json d
router.post('/creat-json', async (req, res) => {
  const url = req.body.url;
  const setNumber = req.body.setNumber;
  const data = await createLegoSetJson(url, setNumber, res);
})

// /parser/list
router.get('/list', async (req, res) => {
    const result = await pgClient.query(`
        select * from data_source;
    `, []);
    res.send({ result });
})

const setLinks = [
    {
      url:
        "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=10040&itemSeq=1",
      setNumber: "10040",
    },
    {
      url: "https://www.bricklink.com/catalogItemInv.asp?S=6286-1",
      setNumber: "6286",
    },
    {
      url: "https://www.bricklink.com/catalogItemInv.asp?S=10210-1",
      setNumber: "10210",
    },
    {
      url: "https://www.bricklink.com/catalogItemInv.asp?S=6274-1",
      setNumber: "6274",
    },
    {
      url: "https://www.bricklink.com/CatalogItemInv.asp?S=6243-1",
      setNumber: "6243",
    },
    {
      url: "https://www.bricklink.com/catalogItemInv.asp?S=4195-1",
      setNumber: "4195",
    },
    {
      url: "https://www.bricklink.com/catalogItemInv.asp?S=6285-1",
      setNumber: "6285",
    },
    {
      url:
        "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=70413-1&itemSeq=1",
      setNumber: "70413",
    },
    {
      url:
        "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=7675&itemSeq=1",
      setNumber: "7675",
    },
    {
      url:
        "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=7676&itemSeq=1",
      setNumber: "7676",
    },
    {
      setNumber: "10195",
      url:
        "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=10195&itemSeq=1",
    },
    {
      setNumber: "75151",
      url:
        "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=75151&itemSeq=1",
    },
    {
      setNumber: "6271",
      url:
        "https://www.bricklink.com/catalogItemInv.asp?fromForm=Y&itemType=S&itemNo=6271&itemSeq=1",
    },
    {
      setNumber: "60004",
      url:
        "https://www.bricklink.com/CatalogItemInv.asp?S=60004-1",
    },
  ];
// /parser/ink/list
router.get('/link/list', (req, res) => {
  res.send({data: setLinks });
})

module.exports = router;