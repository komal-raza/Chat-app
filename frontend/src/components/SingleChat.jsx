import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../store/useConversation";
import { extractTime } from "../utils/extractTime";

const SingleChat = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const loggedInUser = message.senderId === authUser?._id;
  const chatClassName = loggedInUser ? "chat-end" : "chat-start";
  const chatBackgroundColor = loggedInUser
    ? "chat-bubble-secondary"
    : "chat-bubble-warning";
  const profilePic = loggedInUser
    ? authUser?.profilePic
    : selectedConversation?.profilePic;

  const shakeText = message.shouldShake ? "shake" : "";
  const formattedDate = extractTime(message.createdAt);
  return (
    <div>
      <div className={`chat ${chatClassName} `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt={authUser?.fullName} src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble ${chatBackgroundColor} ${shakeText}`}>
          {message?.message}
        </div>
        <div className="mt-1 chat-footer opacity-50 text-xs text-green-100 flex gap-1 items-center">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
