import { useState, useEffect } from "react";
// import emami from "../assets/icon/emam icon-02.svg";
// import tamam from "../assets/icon/tamam.png";
// import "./CurrencyItem.css";

const CoinItems = (props) => {
  console.log("pppp", props.item);

  return (
    <div
      style={{ direction: "rtl" }}
      className={`mt-2 mx-auto grid grid-cols-3 my-5  rounded-lg py-7 shadow-[#2334f48a] shadow-sm  text-[52px]`}
    >
      <div className={`mx-auto text-[#030f95]`}>{props?.item[1]?.name}</div>

      <div className="mx-auto  ">
        <span className="font-sans font-bold  text-[60px]">
          {props?.item[2]?.buyPrice?.toLocaleString()}
        </span>
      </div>
      <div className="mx-auto  ">
        <span className="font-sans font-bold text-[60px]">{props?.item[3]?.sellPrice?.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CoinItems;
