import React from "react";
import Tamam from "../../assets/image/tamam.png";
import Emami from "../../assets/image/emami.svg";
const CoinItems = (props) => {
  return (
    <div
      style={{ direction: "rtl", webkitAppRegion: "no-drag" }}
      className={`grid grid-cols-3 my-1 ${
        props.index % 2 !== 0 && props.index * 2 + 1 === props.id
          ? "text-gray-700 "
          : "text-red-700 "
      }`}
    >
      <div
        className={`flex flex-row justify-end  font-semibold ${
          props.id === 2 ? "text-[14px]" : ""
        }`}
      >
        <img
          className="w-7 h-7  mx-auto my-auto "
          src={props.name.includes("امامی") ? Emami : Tamam}
        />
        <span className=" w-32">{props.name}</span>
      </div>
      <div>
        <input
          type="checkbox"
          className="accent-[#ed1c24] ml-1 "
          checked={props.buyCheckbox}
          onChange={props.buyCheckboxChange}
        />

        <input
          dir="ltr"
          type="text"
          value={props.value?.buyPrice.toLocaleString()}
          onChange={props.buyPriceChange}
          className=" rounded-lg w-24 text-red-700 shadow-md shadow-[#5c5b5b] outline-none px-1  mx-auto "
        />
      </div>

      <div>
        <input
          type="checkbox"
          className="accent-[#ed1c24] ml-1"
          checked={props.sellCheckbox}
          onChange={props.sellCheckboxChange}
        />
        <input
          dir="ltr"
          type="text"
          value={props.value?.sellPrice.toLocaleString()}
          onChange={props.sellPriceChange}
          className=" rounded-lg w-24 text-red-700 shadow-md shadow-[#5c5b5b] outline-none px-1 mx-auto "
        />
      </div>
    </div>
  );
};

export default CoinItems;
