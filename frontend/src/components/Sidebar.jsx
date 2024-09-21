import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import LoggedInUser from "./LoggedInUser";

const Sidebar = () => {
  return (
    <div className="w-16 sm:w-24 md:w-full border-r border-slate-500 p-1 sm:p-4 flex flex-col overflow-auto">
      <span className="hidden md:block">
        <SearchInput />
      </span>
      <span className="block md:hidden">
        <LoggedInUser />
      </span>
      <div className="divider px-3" />

      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
