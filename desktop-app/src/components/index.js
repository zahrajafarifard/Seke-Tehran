import React, { useEffect, useState } from "react";

import Coin from "./coin";

const Main = () => {
  // const dispatch = useDispatch();

  const [locationState, setLocation] = useState("");
  const [loadingUpdateTablo, setLoadingUpdateTablo] = useState(false);
  const [loadingUpdateSite, setLoadingUpdateSite] = useState(false);
  const [coin, setCoin] = useState([]);
  const [coinPrice, setCoinPrice] = useState([]);

  const [blvUpdateSiteState, setBlvUpdateSiteState] = useState(false);
  const [pelatinUpdateSiteState, setPelatinUpdateSiteState] = useState(false);
  const [pasagUpdateSiteState, setPasagUpdateSiteState] = useState(false);

  const [blvUpdateTabloState, setBlvUpdateTabloState] = useState(false);
  const [pelatinUpdateTabloState, setPelatinUpdateTabloState] = useState(false);
  const [pasagUpdateTabloState, setPasagUpdateTabloState] = useState(false);

  const [blvOnOffTabloState, setBlvOnOffTabloState] = useState(false);
  const [pelatinOnOffTabloState, setPelatinOnOffTabloState] = useState(false);
  const [pasagOnOffTabloState, setPasagOnOffTabloState] = useState(false);

  const [blvUpdateVoipState, setBlvUpdateVoipState] = useState(false);
  const [pelatinUpdateVoipState, setPelatinUpdateVoipState] = useState(false);
  const [pasagUpdateVoipState, setPasagUpdateVoipState] = useState(false);

  useEffect(() => {
    window?.LocApi?.send("writeToFile", "Hello from React!");

    window?.LocApi?.receive("writeToFileSuccess", (message) => {
      setLocation(message);
    });
  }, [locationState, setLocation]);

  useEffect(() => {
    let _response, _data;

    const fetchData = async () => {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/getConfig/${
          locationState.trim() === "bolvaar"
            ? 1
            : locationState.trim() === "pelatin"
            ? 2
            : 3
        }`
      );
      if (!_response.ok) {
        throw new Error("err occurred...");
      }
      _data = await _response.json();

      // console.log("_data.data", _data.data);
      switch (_response.status) {
        case 200:
          setBlvUpdateSiteState(_data.data?.blvUpdateSite);
          setBlvUpdateTabloState(_data.data?.blvUpdateTablo);
          setBlvOnOffTabloState(_data.data?.blvTurnONOFFTablo);
          setBlvUpdateVoipState(_data.data?.blvUpdateVoip);

          setPelatinUpdateSiteState(_data.data?.pelatinUpdateSite);
          setPelatinUpdateTabloState(_data.data?.pelatinUpdateTablo);
          setPelatinOnOffTabloState(_data.data?.pelatinTurnONOFFTablo);
          setPelatinUpdateVoipState(_data.data?.pelatinUpdateVoip);

          setPasagUpdateSiteState(_data.data?.pasagUpdateSite);
          setPasagUpdateTabloState(_data.data?.pasagUpdateTablo);
          setPasagOnOffTabloState(_data.data?.pasagTurnONOFFTablo);
          setPasagUpdateVoipState(_data.data?.pasagUpdateVoip);
          break;
        case 404:
          console.log("404...");
          break;
        case 500:
          console.log("500...");
          break;
        default:
          console.log("error occured...");
          break;
      }
    };
    locationState.length != 0 && fetchData();
  }, [locationState, setLocation]);

  const turnOffTabloHandler = async () => {
    blvOnOffTabloState && turnOffTabloBLVHandler();
    pelatinOnOffTabloState && turnOffTabloPlatinHandler();
    pasagOnOffTabloState && turnOffTabloPasageHandler();
  };

  const turnOffTabloBLVHandler = async () => {
    let _response, _data;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/turnOFFTabloBLV`
      );
      _data = await _response.json();
      if (_response.ok) {
        return window.Notification.showSuccess("تابلو بلوار خاموش شد.");
      }
    } catch (error) {
      return window.Notification.showError("عدم موفقیت در خاموش شدن تابلو .");
    }
  };
  const turnOffTabloPlatinHandler = async () => {
    let _response, _data;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/turnOFFTabloPelatin`
      );
      _data = await _response.json();
      if (_response.ok) {
        return window.Notification.showSuccess("تابلو پلاتین خاموش شد.");
      }
    } catch (error) {
      return window.Notification.showError("عدم موفقیت در خاموش شدن تابلو .");
    }
  };
  const turnOffTabloPasageHandler = async () => {
    let _response, _data;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/turnOFFTabloPasage`
      );
      _data = await _response.json();
      if (_response.ok) {
        return window.Notification.showSuccess("تابلو پاساژ خاموش شد.");
      }
    } catch (error) {
      return window.Notification.showError("عدم موفقیت در خاموش شدن تابلو .");
    }
  };

  const coinPriceHandler = (coinPrice) => {
    setCoinPrice(coinPrice);
  };

  const coinHandler = (coin) => {
    setCoin(coin);
  };

  const updateHandler = async () => {
    // blvUpdateSiteState &&
    //   // "blvUpdateSiteState".includes(text) &&
    //   updateSiteHandler();
    // pelatinUpdateSiteState &&
    //   // "pelatinUpdateSiteState".includes(text) &&
    //   updateSiteHandler();
    // pasagUpdateSiteState &&
    //   // "pasagUpdateSiteState".includes(text) &&
    //   updateSiteHandler();
    if (blvUpdateSiteState || pelatinUpdateSiteState || pasagUpdateSiteState) {
      updateSiteHandler();
    }

    blvUpdateTabloState && await updateTabloBLVHandler();
    pasagUpdateTabloState && await updateTabloPasagHandler();
    pelatinUpdateTabloState && await updateTabloPelatinHandler();

    blvUpdateVoipState && await updateVoipByBLVHandler();
    pelatinUpdateVoipState && await updateVoipByPelatinHandler();
    pasagUpdateVoipState && await updateVoipByPasagHandler();
  };

  const updateVoipByBLVHandler = async () => {
    setLoadingUpdateTablo(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/updateVoipByBLV`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ coin, coinPrice }),
        }
      );
      await _response.json();
    } catch (error) {
      setLoadingUpdateTablo(false);
      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط بلوار. "
      );
    }

    if (_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showSuccess(
        "به روز رسانی تلفن گویا توسط بلوار انجام شد ."
      );
    }
    if (_response.status === 500) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط بلوار. "
      );
    }
    if (!_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط بلوار. "
      );
    }
  };
  const updateVoipByPelatinHandler = async () => {
    setLoadingUpdateTablo(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/updateVoipByPelatin`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ coin, coinPrice }),
        }
      );
      await _response.json();
    } catch (error) {
      setLoadingUpdateTablo(false);
      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط پلاتین. "
      );
    }

    if (_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showSuccess(
        "به روز رسانی تلفن گویا توسط پلاتین انجام شد ."
      );
    }
    if (_response.status === 500) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط پلاتین. "
      );
    }
    if (!_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط پلاتین. "
      );
    }
  };
  const updateVoipByPasagHandler = async () => {
    setLoadingUpdateTablo(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/updateVoipByPasag`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ coin, coinPrice }),
        }
      );
      await _response.json();
    } catch (error) {
      setLoadingUpdateTablo(false);
      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط پاساژ. "
      );
    }

    if (_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showSuccess(
        "به روز رسانی تلفن گویا توسط پاساژ انجام شد ."
      );
    }
    if (_response.status === 500) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط پاساژ. "
      );
    }
    if (!_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError(
        "عدم به روز رسانی تلفن گویا توسط پاساژ. "
      );
    }
  };

  const updateTabloBLVHandler = async () => {
    setLoadingUpdateTablo(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/updateTabloBLV`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ coin, coinPrice }),
        }
      );
      await _response.json();
    } catch (error) {
      setLoadingUpdateTablo(false);
      return window.Notification.showError("عدم به روز رسانی تابلو بلوار. ");
    }

    if (_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showSuccess(
        "به روز رسانی تابلو بلوار با موفقیت انجام شد ."
      );
    }
    if (_response.status === 500) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError("عدم به روز رسانی تابلو بلوار. ");
    }
    if (!_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError("عدم به روز رسانی تابلو بلوار. ");
    }
  };

  const updateTabloPasagHandler = async () => {
    setLoadingUpdateTablo(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/updateTabloPasag`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ coin, coinPrice }),
        }
      );
      await _response.json();
    } catch (error) {
      setLoadingUpdateTablo(false);
      return window.Notification.showError("عدم به روز رسانی تابلو پاساژ. ");
    }

    if (_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showSuccess(
        "به روز رسانی تابلو پاساژ با موفقیت انجام شد ."
      );
    }
    if (_response.status === 500) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError("عدم به روز رسانی تابلو پاساژ. ");
    }
    if (!_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError("عدم به روز رسانی تابلو پاساژ. ");
    }
  };

  const updateTabloPelatinHandler = async () => {
    setLoadingUpdateTablo(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL_LOCAL}/api/updateTabloPelatin`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ coin, coinPrice }),
        }
      );
      await _response.json();
    } catch (error) {
      setLoadingUpdateTablo(false);
      return window.Notification.showError("عدم به روز رسانی تابلو پلاتین. ");
    }

    if (_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showSuccess(
        "به روز رسانی تابلو پلاتین با موفقیت انجام شد ."
      );
    }
    if (_response.status === 500) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError("عدم به روز رسانی تابلو پلاتین. ");
    }
    if (!_response.ok) {
      setLoadingUpdateTablo(false);

      return window.Notification.showError("عدم به روز رسانی تابلو پلاتین. ");
    }
  };

  const updateSiteHandler = async () => {
    setLoadingUpdateSite(true);
    let _response;

    try {
      _response = await fetch(`${process.env.REACT_APP_URL}/api/updatecoin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          secretKey: process.env.REACT_APP_SECRET_KEY,
        },
        body: JSON.stringify({ coinPrice }),
      });
    } catch {
      setLoadingUpdateSite(false);
      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }

    try {
      await _response.json();
    } catch {
      setLoadingUpdateSite(false);

      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }

    if (_response.ok) {
      setLoadingUpdateSite(false);

      return window.Notification.showSuccess(
        "به روز رسانی سایت با موفقیت انجام شد ."
      );
    }

    if (_response.status === 500) {
      setLoadingUpdateSite(false);

      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }

    if (!_response.ok) {
      setLoadingUpdateSite(false);

      return window.Notification.showError("عدم به روز رسانی سایت. ");
    }
  };

  return (
    <div style={{ webkitAppRegion: "drag" }} className="overflow-hidden">
      <div style={{ direction: "rtl" }} className="">
        <div className="w-full mx-auto">
          <Coin coinPriceState={coinPriceHandler} coinState={coinHandler} />
        </div>
      </div>

      <div
        style={{ webkitAppRegion: "no-drag" }}
        className="flex flex-row-reverse justify-center mt-8"
      >
        <button
          className={`px-3  py-1  text-[14px] shadow-md  rounded-xl  font-bold bg-black text-white mx-3
          ${(loadingUpdateTablo || loadingUpdateSite) && "animate-pulse "} `}
          onClick={updateHandler}
        >
          {loadingUpdateTablo || loadingUpdateSite
            ? " ... در حال به روز رسانی"
            : "به روز رسانی  "}
        </button>

        <button
          className={`px-2  py-1 hover:cursor-pointer  text-[14px] shadow-md  shadow-re-900 rounded-xl  font-bold bg-black text-white
            `}
          onClick={turnOffTabloHandler}
        >
          خاموش کردن تابلو
        </button>
      </div>

      <div className=" w-1/2 mx-auto -mr-2 -mt-10 ">
        <div className="grid grid-cols-4  text-[9px] font-bold pl-3  w-1/2 mx-auto text-end ">
          <span>پاساژ</span>
          <span>پلاتین</span>
          <span>بلوار</span>
          <span></span>
        </div>

        <div
          style={{ direction: "rtl", webkitAppRegion: "no-drag" }}
          className="grid grid-cols-4  text-[8px] font-bold w-1/2 mx-auto "
        >
          <div className="-mr-3 w-fit text-right">همزمانی با سایت </div>
          <div>
            {blvUpdateSiteState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pelatinUpdateSiteState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pasagUpdateSiteState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
        </div>

        <div
          style={{ direction: "rtl", webkitAppRegion: "no-drag" }}
          className="grid grid-cols-4  text-[8px] w-1/2 mx-auto"
        >
          <div className="-mr-3 w-fit text-right font-bold">
            به روز رسانی تابلو
          </div>
          <div>
            {blvUpdateTabloState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pelatinUpdateTabloState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pasagUpdateTabloState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
        </div>

        <div
          style={{ direction: "rtl", webkitAppRegion: "no-drag" }}
          className="grid grid-cols-4  text-[8px]  w-1/2 mx-auto"
        >
          <div className="-mr-4 w-fit text-right font-bold">
            خاموش/روشن تابلو
          </div>
          <div>
            {blvOnOffTabloState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pelatinOnOffTabloState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pasagOnOffTabloState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
        </div>
        <div
          style={{ direction: "rtl", webkitAppRegion: "no-drag" }}
          className="grid grid-cols-4  text-[8px]  w-1/2 mx-auto"
        >
          <div className=" w-fit  font-bold"> تلفن گویا</div>
          <div>
            {blvUpdateVoipState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pelatinUpdateVoipState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
          <div>
            {pasagUpdateVoipState ? (
              <div className="w-2 h-2 border-4 rounded-full bg-green-700 border-green-700"></div>
            ) : (
              <div className="w-2 h-2 border-4 rounded-full bg-[#ed1c24] border-[#ed1c24]"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
