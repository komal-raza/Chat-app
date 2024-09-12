import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useMessageSent from "../hooks/useMessageSent";
const ChatInput = () => {
  const [message, setMessage] = useState("");

  const { sentMessage, loading } = useMessageSent();

  async function handleSubmit(e) {
    e.preventDefault();

    if (message === "") {
      retrun;
    }
    await sentMessage(message);
    setMessage("")
  }
  return (
    // <div className=''>
    <form onSubmit={handleSubmit} className="px-4 w-full">
      <div className="relative w-full">
        <input
          type="text"
          className=" border text-sm rounded-lg block md:w-[350px] lg:w-[400px] p-2.5 bg-gray-700 border-gray-600 text-white pr-8"
          placeholder="send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-4 "
        >
         {loading? <span className="loading loading-spinner text-white"></span>: <BsSend className="text-white" />}
        </button>
      </div>
    </form>
    // </div>
  );
};

export default ChatInput;
