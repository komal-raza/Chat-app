import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Search.."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-slate-900 text-white">
        <IoSearchOutline className="w-4 h-4 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
