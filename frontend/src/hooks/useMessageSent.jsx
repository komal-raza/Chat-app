import React, { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useMessageSent = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConversation();

  async function sentMessage(message) {
    setLoading(true);
    try {

        const sendMessageQuery = await fetch(`/api/v1/messages/send/${selectedConversation?._id}`,{
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({message})
        });

        const messageSentResponse =  await sendMessageQuery.json();

        if(messageSentResponse.error){
            throw new Error(`${messageSentResponse.error}`);
        }


        setMessages([...messages,messageSentResponse])
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { sentMessage, loading };
};

export default useMessageSent;
