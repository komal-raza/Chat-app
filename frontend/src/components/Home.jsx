import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Home = () => {
  return (
    <div className="flex h-[600px] sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden overflow-x-hidden overflow-y-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-20">
      <Sidebar/>
      <MessageContainer />
    </div>
  );
};

export default Home;
