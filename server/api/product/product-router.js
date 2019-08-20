const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");
const restricted = require("../users/restricted-middleware.js");

const db = knex(knexConfig.development);

router.get("/", restricted, (req, res) => {
  db("product")
    .then(product => {
      res.status(201).json(product);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/add", (req, res) => {
  const product = req.body;

  db("product")
    .insert(product)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;