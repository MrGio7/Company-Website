const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");
const restricted = require("../users/restricted-middleware.js");

const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  db("likes")
    .then(likes => {
      res.status(201).json(likes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
