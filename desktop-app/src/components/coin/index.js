import React, { useEffect, useState } from "react";
import CoinItems from "./coinItems";
import { io } from "socket.io-client";

const Coin = ({ coinPriceState, coinState }) => {
  const [coins, setCoins] = useState([]);
  const [coinPrice, setCoinPrice] = useState([]);

  const [locationState, setLocation] = useState("");

  useEffect(() => {
    const fetchFunc = async () => {
      let _data, _response;
      try {
        _response = await fetch(
          `${process.env.REACT_APP_URL_LOCAL}/api/getCoinNames`
        );

        if (!_response.ok) {
          throw new Error("err occurred...");
        }
        _data = await _response.json();

        const arr = [];
        for (let index = 0; index < _data.data?.length; index++) {
          if (index % 2 === 0) {
            const refactorCoins = {};
            refactorCoins.id = _data.data[index]?.id;
            refactorCoins.CoinName = _data.data[index]?.CoinName;
            refactorCoins.BuyStatus = _data.data[index]?.Status;
            refactorCoins.SellStatus = _data.data[index + 1]?.Status;

            arr.push(refactorCoins);
          }
        }

        setCoins(arr);
        coinState(arr);
      } catch (error) {
        switch (_response.status) {
          case 404:
            console.log("404 Occured...");
            break;
          case 500:
            console.log("500 Occured...");
            break;
          default:
            console.log("Err Occured...");
            break;
        }
      }
    };
    fetchFunc();
  }, []);

  useEffect(() => {
    window?.LocApi?.send("writeToFile", "Hello from React!");

    window?.LocApi?.receive("writeToFileSuccess", (message) => {
      setLocation(message);
    });
  }, [locationState, setLocation]);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_URL_LOCAL}`, {
      transports: ["polling"],
    });

    socket.on("getCoinsSocket", async (_data) => {
      const arr = _data.map((subArray) => {
        return subArray.reduce((acc, obj) => {
          return { ...acc, ...obj };
        }, {});
      });

      // console.log("arr socc", arr);
      setCoinPrice(arr);
      coinPriceState(arr);
    });
  }, [setCoinPrice, coinPriceState]);

  useEffect(() => {
    const fetchFunc = async () => {
      let _data, _response;

      try {
        _response = await fetch(
          `${process.env.REACT_APP_URL_LOCAL}/api/getCoins`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ table: locationState }),
          }
        );

        if (!_response.ok) {
          throw new Error("err occurred...");
        }

        _data = await _response.json();
        const arr = [];
        for (let index = 0; index < _data.data?.length; index++) {
          if (index % 2 === 0) {
            const refactorCoins = {};
            refactorCoins.id = _data.data[index]?.id;
            refactorCoins.buyPrice = _data.data[index]?.Price;
            refactorCoins.sellPrice = _data.data[index + 1]?.Price;

            arr.push(refactorCoins);
          }
        }

        console.log("arrr data", arr);
        setCoinPrice(arr);
        coinPriceState(arr);
      } catch (error) {
        switch (_response.status) {
          case 404:
            console.log("404 Occured...");
            break;
          case 500:
            console.log("500 Occured...");
            break;
          default:
            console.log("Err Occured...");
            break;
        }
      }
    };
    locationState.length != 0 && fetchFunc();
  }, [locationState, setLocation]);

  const buyCheckboxChangeHandler = async (index, event) => {
    const newCoins = [...coins];
    newCoins[index].BuyStatus = !newCoins[index].BuyStatus;
    setCoins(newCoins);
    coinState(newCoins);
  };
  const sellCheckboxChangeHandler = async (index, event) => {
    const newCoins = [...coins];
    newCoins[index].SellStatus = !newCoins[index].SellStatus;
    setCoins(newCoins);
    coinState(newCoins);
  };
  const buyPriceChangeHandler = async (index, event) => {
    const newCoinPrice = [...coinPrice];

    newCoinPrice[index].buyPrice =
      event.target.value === ""
        ? 0
        : parseInt(event.target.value.replace(/,/g, "")).toLocaleString();
    setCoinPrice(newCoinPrice);
    coinPriceState(newCoinPrice);
  };
  const sellPriceChangeHandler = async (index, event) => {
    const newCoinPrice = [...coinPrice];

    newCoinPrice[index].sellPrice =
      event.target.value === ""
        ? 0
        : parseInt(event.target.value.replace(/,/g, "")).toLocaleString();

    setCoinPrice(newCoinPrice);
    coinPriceState(newCoinPrice);
  };

  return (
    <div className="text-center ">
      <div
        style={{ direction: "rtl" }}
        className="grid grid-cols-3 mx-auto w-full font-semibold text-sm text-gray-700"
      >
        <div>سکه</div>
        <div>خرید</div>

        <div> فروش</div>
      </div>
      {coins?.map((coin, index) => {
        return (
          <CoinItems
            key={index}
            index={index}
            id={coin.id}
            name={coin.CoinName}
            buyCheckbox={coin.BuyStatus}
            sellCheckbox={coin.SellStatus}
            value={coinPrice[index]}
            buyPriceChange={(event) => {
              buyPriceChangeHandler(index, event);
            }}
            sellPriceChange={(event) => {
              sellPriceChangeHandler(index, event);
            }}
            buyCheckboxChange={(event) => {
              buyCheckboxChangeHandler(index, event);
            }}
            sellCheckboxChange={(event) => {
              sellCheckboxChangeHandler(index, event);
            }}
          />
        );
      })}
    </div>
  );
};

export default Coin;
