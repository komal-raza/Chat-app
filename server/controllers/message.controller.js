const ConversationModel = require("../models/coversation.model");
const MessageModel = require("../models/message.model");
const { io, getReceiverSocketId } = require("../socket/socket");

async function SendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    // Find the conversation between the receiver and the sender
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Initiate the conversation

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage?._id);
    }

    // Save the message in database
    // await conversation.save();
    // await newMessage.save();
    // Run in parallel (instead of using two await run promise .all to execute both promises)
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO THERE

    const receiverSocketId = getReceiverSocketId(receiverId);

    // console.log(receiverSocketId, "Receiver Socket ID");

    if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
      // io.emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
  } catch (error) {
    console.log(error, "Message sent failed");
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const GetMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log(error, "Message fetching failed");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { SendMessage, GetMessage };
