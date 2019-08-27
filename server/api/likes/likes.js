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

router.put("/", (req, res) => {
  const body = req.body;
  const { id_user, id_product } = req.body;
  const Data = db("likes")
    .where({ id_user, id_product })
    .first();

  Data.then(item => {
    if (item === undefined) {
      db("likes")
        .insert(body)
        .then(() => {
          Data.then(data => {
            res.status(200).json(data);
          });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      const { likes } = { likes: item.likes === 0 ? 1 : 0 };

      db("likes")
        .where({ id_user, id_product })
        .update({ likes })
        .then(() => {
          Data.then(data => {
            res.status(200).json(data);
          });
        });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: `Data error` });
  });
});

module.exports = router;
