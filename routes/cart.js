const express = require("express");
const router = express.Router();

const { userRole } = require("../constant/constant");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

//validation
const { addCartValidation } = require("../Validation/cartValidation");
const { removeCartValidation } = require("../Validation/cartValidation");

//controller
const { addToCart } = require("../Controller/cartController");
const { removeToCart } = require("../Controller/cartController");
const { listingCartIteams } = require("../Controller/cartController");

//add to cart

router.post(
  "/",
  [AuthMiddleware([userRole.ENDUSER]), addCartValidation],
  addToCart
);

//remove iteam to cart
router.delete(
  "/",
  [AuthMiddleware([userRole.ENDUSER]), removeCartValidation],
  removeToCart
);

//listing cart
router.get("/", AuthMiddleware([userRole.ENDUSER]), listingCartIteams);

module.exports = router;
