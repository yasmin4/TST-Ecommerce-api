const express = require("express");
const router = express.Router();

//create module
const {
  loginValidation,
  signupValidation,
} = require("../Validation/usersValidation");
const { loginUser, signupUser } = require("../Controller/userController");

//user login route
router.post("/login", loginValidation, loginUser);

//user signup route
router.post("/signup", signupValidation, signupUser);

module.exports = router;
