import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center  pt-[10%]">
      <div className="w-36 h-36 border-l-4 border-[#fff] rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
