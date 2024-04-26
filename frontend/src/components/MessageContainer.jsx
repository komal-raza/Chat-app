import React from "react";
import MessageChat from "./MessageChat";
import ChatInput from "./ChatInput";
import { TiMessages } from "react-icons/ti";
const MessageContainer = () => {
  const isChatSelected = false;
  return (
    <div className="md:min-w-[450px] felx flex-col overflow-auto">
      {isChatSelected ? (
        <>
          {" "}
          <div className="top-0 z-50 sticky bg-slate-500 px-4 py-2 mb-2">
            <span className="text-gray-900 font-bold">Jenny pockey</span>
          </div>
          <div className="py-2 overflow-auto">
            <MessageChat />
          </div>
          <ChatInput />
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
