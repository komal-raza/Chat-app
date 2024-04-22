const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sender ID must be provided"],
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Receiver ID must be provided"],
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

module.exports = MessageModel;
