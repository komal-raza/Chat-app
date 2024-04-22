const express = require('express');
const GetUsers = require('../controllers/user.controller');
const checkUserAuth = require('../middleware/auth.middleware');

const router= express.Router();

router.get("/", checkUserAuth, GetUsers)
module.exports= router;