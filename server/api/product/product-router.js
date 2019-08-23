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

router.get("/:id", restricted, (req, res) => {
  const id = req.params.id;

  db("product")
    .where({ id })
    .first()
    .then(saved => {
      res.status(201).json(saved);
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

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const { name, description, img, price } = req.body;

  db("product")
    .where({ id })
    .update({ name, description, img, price })
    .then(item => {
      console.log(req.body);
      if (res === 0) {
        res.status(404).json({ message: `No posts by that id` });
      } else {
        res.status(200).json(item);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `Data error` });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const id = req.params.id;

  db("product")
    .where({ id })
    .del()
    .then(() => {
      res
        .status(200)
        .json({ message: `product has been successfully deleted` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
