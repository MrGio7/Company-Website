const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");

const db = knex(knexConfig.development);

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db("comments")
    .where({ id_product: id })
    .then(comments => {
      res.status(201).json(comments);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;
