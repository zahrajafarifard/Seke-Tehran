import { Fragment, useState, useEffect } from "react";
import { io } from "socket.io-client";
import moment from "jalali-moment";

import CoinItems from "./CoinItems";
import logo from "../assets/icon/logo.svg";
import Spinner from "../shared/spinner";

const Main = () => {
  const [coins, setCoins] = useState([]);
  const [updatedTabloCoinId, setUpdatedTabloCoinId] = useState([]);
  const [coinUpdatedAt, setCoinUpdatedAt] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/api/getUpdateAtCoin`)
      .then((respone) => {
        return respone.json();
      })
      .then((res) => {
        // console.log("geeettttt", res);
        setCoinUpdatedAt(
          moment(res.Date, "YYYY-MM-DDTHH:mm:ss.SSZ ").format(
            "jYYYY/jM/jD HH:mm z"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/api/getAllCoins`)
      .then((respone) => {
        return respone.json();
      })
      .then((res) => {
        setCoins(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const socket = io(`${process.env.REACT_APP_URL}`, {
      transports: ["polling"],
    });
    socket.on("getUpdateAtCoin", (data) => {
      console.log("update coin socketttt", data);
      setCoinUpdatedAt(
        moment(data.Date, "YYYY-MM-DDTHH:mm:ss.SSZ ").format(
          "jYYYY/jM/jD HH:mm z"
        )
      );
    });

    socket.on("getCoinsSocket", async (data) => {
      setCoins(data);
    });
  }, []);

  return (
    <Fragment>
      <div
        style={{ direction: "rtl" }}
        className={`w-full mx-auto grid grid-cols-3   font-BTitrBold text-3xl py-3
        bg-gradient-to-r from-[#2336F4] to-[#000C8C] text-white
        `}
      >
        <div className="w-[100%] my-auto flex flex-row mx-auto text-center justify-center text-[20px] font-IRANSansWeb ">
          <span className="text-2xl  my-auto mx-4 text-center text-[30px] ">
            تاریخ امروز :
          </span>
          <p
            style={{ direction: "ltr" }}
            className="text-2xl mx-2 justify-center  text-[28px] font-sans font-bold "
          >
            {moment(new Date(), "YYYY-MM-DDTHH:mm:ss.SSZ ").format(
              "jYYYY/jM/jD"
            )}
          </p>
        </div>
        <div className="flex flex-row my-auto    mx-auto ">
          <div className=" mx-auto">
            <img src={logo} className="w-48 h-32" />
          </div>
          <div className=" w-full mx-auto my-auto  text-center text-[40px] tracking-wide">
            سکه تهران
          </div>
        </div>

        <div className="w-[100%] my-auto flex flex-row mx-auto text-center justify-center text-[20px] font-IRANSansWeb ">
          <span className="text-2xl   text-center text-[30px] mx-4 ">
            به روز رسانی :
          </span>

          <p
            style={{ direction: "ltr" }}
            className="text-2xl mx-2 justify-center  my-auto text-[28px]  font-sans font-bold"
          >
            {coinUpdatedAt}
          </p>
        </div>
      </div>
      <div className="w-[70%] mx-auto  font-BTitrBold ">
        <div
          style={{ direction: "rtl" }}
          className={`w-full mx-auto grid grid-cols-3   font-BTitrBold text-3xl py-5 `}
        >
          <div className="text-center text-4xl">سکه</div>
          <div className="text-center text-4xl">خرید</div>
          <div className="text-center text-4xl">فروش</div>
        </div>
        {!(coins == [] || coins?.length == 0 || coins == undefined) ? (
          coins?.map((item, index) => {
            // console.log("iiiiii", item[0].id);
            return (
              <div key={item[0].id}>
                <CoinItems
                  item={item}
                  updated={updatedTabloCoinId}
                  index={index}
                />
              </div>
            );
          })
        ) : (
          <div className="col-start-2 ">
            <Spinner />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Main;

