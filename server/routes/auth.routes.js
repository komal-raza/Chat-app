const express = require("express");
const {
  SignupUser,
  SigninUser,
  SignoutUser,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", SignupUser);

router.post("/signin", SigninUser);

router.post("/signout", SignoutUser);


module.exports = router