const express = require("express");
const router = express.Router();

const { userRole } = require("../constant/constant");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

//controller
const { productListing } = require("../Controller/productController");

//product listing
router.get(
  "/",
  AuthMiddleware([userRole.ADMIN, userRole.ENDUSER]),
  productListing
);

module.exports = router;
