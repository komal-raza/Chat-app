import React, { useEffect } from "react";
import MessageChat from "./MessageChat";
import ChatInput from "./ChatInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../store/useConversation";
import { useAuthContext } from "../context/AuthContext";
import useListenMessages from "../hooks/useListenMessages";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isChatSelected = selectedConversation;
  useListenMessages();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="xs:min-w-[300px] xs:max-w-[300px]  md:min-w-[450px] overflow-hidden h-full flex flex-col">
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
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welocome {authUser?.fullName || ""}</p>
        <p>Select A chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
