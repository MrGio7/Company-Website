const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("./api/users/users-router.js");
const productRouter = require("./api/product/product-router.js");
const authRouter = require("./api/users/auth-router.js");
const commentsRouter = require("./api/comments/comments.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/product", productRouter);
server.use("/api/auth", authRouter);
server.use("/api/comments", commentsRouter);

server.get("/", (req, res) => {
  res.send("server is up");
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`server is listening port ${port}`));
