const express = require("express");
const router = express.Router();

//Controllers
const usersRouter = require("./users");
const productRouter = require("./product");
const cartRouter = require("./cart");

//Module vise api
router.use("/users", usersRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

module.exports = router;
