import React, { useEffect } from "react";
import MessageChat from "./MessageChat";
import ChatInput from "./ChatInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../store/useConversation";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isChatSelected = selectedConversation;

  useEffect(() => {
    return () => setSelectedConversation(null);
  },[setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] h-full flex flex-col  ">  
    {/* overflow-y-auto */}
      {isChatSelected ? (
        <>
          {" "}
          <div className="top-0 z-50 sticky bg-slate-500 px-4 py-2 mb-2">
            <div className=" flex gap-2">
              <img
                src={selectedConversation.profilePic}
                alt={selectedConversation.fullName}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-gray-900 font-bold">
                {selectedConversation?.fullName}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-auto">
            <MessageChat />
          </div>
          <div className="z-50 w-full sticky bg-slate-900 px-1 py-2">
            <ChatInput />
          </div>
        </>
      ) : (
        <NoChatSelectedContainer />
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelectedContainer = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welocome Jenny Pockey</p>
        <p>Select A chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
