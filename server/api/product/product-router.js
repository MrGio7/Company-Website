const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");

const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  db("product")
    .then(product => {
      res.status(201).json(product);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
