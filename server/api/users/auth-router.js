const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");

const db = knex(knexConfig.development);

router.post("/register", (req, res) => {
  db("users")
    .insert(req.body)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json({ message: `welcome user ${user.username}` });
      } else {
        res.status(401).json("invalid credentials");
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
