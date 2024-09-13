import React, { useEffect, useRef } from "react";
import SingleChat from "./SingleChat";
import useGetMessages from "../hooks/useGetMessages";
import MessageChatSkeleton from "./MessagesChatSkeleton";
import useListenMessages from "../hooks/useListenMessages";

const MessageChat = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  
  const lastMessagRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessagRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    /* flex-1 overflow-auto */
    <div className="px-4 flex flex-col gap-2">
      {!loading &&
        messages?.length > 0 &&
        messages?.map((message, index) => (
          <div
            key={message?._id}
            ref={index === messages.length - 1 ? lastMessagRef : null}
          >
            <SingleChat message={message} />
          </div>
        ))}
      {loading &&
        [...Array(3)].map((_, index) => <MessageChatSkeleton key={index} />)}

      {!loading && messages?.length === 0 && (
        <p className="min-h-full flex justify-center items-center text-white">
          Sent a Message to Start Conversation
        </p>
      )}
    </div>
  );
};

export default MessageChat;
