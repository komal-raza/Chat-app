import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useConversation from "../store/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  async function handleSearch(e) {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Please Type 3 characters to search");
    }

    const conversation = conversations.find((conver) =>
      conver.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if(conversation){
      setSelectedConversation(conversation);
      setSearch("")
    }else{
      toast.error("No Result Found");
    }
  }
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Search.."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-slate-900 text-white">
        <IoSearchOutline className="w-4 h-4 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
