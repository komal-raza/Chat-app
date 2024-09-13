import React from "react";
import useConversation from "../store/useConversation";
import { useSocketContext } from "../context/SocketContext";

const SingleConversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation?._id;
  const { onlineUsers } = useSocketContext();

  const imageURL = conversation ? conversation.profilePic : "";
  const isUserOnline = onlineUsers.includes(conversation?._id);

  // console.log(selectedConversation);

  return (
    <>
      {" "}
      <div
        className={`flex gap-2 items-center hover:bg-slate-800 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isUserOnline ? "online" : ""} `}>
          <div className="w-12 rounded-full">
            {conversation?.profilePic ? (
              <img src={imageURL} alt={conversation.fullName.charAt(0)} />
            ) : (
              <span> {conversation?.fullName?.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-around">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default SingleConversation;
