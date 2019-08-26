const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../../knexfile.js");

const db = knex(knexConfig.development);

router.get("/")



export default router;
