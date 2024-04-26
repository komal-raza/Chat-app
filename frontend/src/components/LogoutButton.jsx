import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";

const LogoutButton = () => {
  return (
    <div className="mt-auto pt-4">
      {" "}
      <RiLogoutCircleLine className="h-7 w-6 text-white cursor-pointer"/>
    </div>
  );
};

export default LogoutButton;
