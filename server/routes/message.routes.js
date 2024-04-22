const express = require("express");
const { SendMessage, GetMessage } = require("../controllers/message.controller");
const checkUserAuth = require("../middleware/auth.middleware");
const router = express.Router();

// Sent Message
router.post("/send/:id", checkUserAuth, SendMessage);

// Get Messages
router.get("/:id", checkUserAuth, GetMessage);

module.exports = router;
