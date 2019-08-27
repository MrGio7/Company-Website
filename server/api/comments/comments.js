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

router.post("/add", (req, res) => {
  const comment = req.body;

  db("comments")
    .insert(comment)
    .then(saved => {
      const id = saved.toString();
      db("comments")
        .where({ id })
        .first()
        .then(obj => {
          res.status(201).json(obj);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.body;

  db("comments")
    .where({ id })
    .del()
    .then(() => {
      res
        .status(200)
        .json({ message: `comment has been successfully deleted` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
