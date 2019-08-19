const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");
const restricted = require("./restricted-middleware.js");

const db = knex(knexConfig.development);

router.get("/", restricted, (req, res) => {
  db("users")
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
