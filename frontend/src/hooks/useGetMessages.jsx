import React, { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      try {
        const getMessageResponse = await fetch(
          `/api/v1/messages/${selectedConversation?._id}`
        );

        const messagesResult = await getMessageResponse.json();
        if (messagesResult?.error) throw new Error(messagesResult.error);
        setMessages(messagesResult);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
