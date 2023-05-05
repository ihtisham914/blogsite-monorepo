import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <InfinitySpin width="500" color="#4fa94d" />
    </div>
  );
};

export default loader;
