import React from "react";
import SingleConversation from "./SingleConversation";
import { getRandomEmoji } from "../utils/index";
import useGetConversations from "../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-hidden">
      {conversations?.length > 0 &&
        conversations?.map((conversation, idx) => (
          <SingleConversation
            key={conversation?._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversation?.length - 1}
          />
        ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
