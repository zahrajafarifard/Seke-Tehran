import React, { useState, useEffect } from "react";

// import filePath from "../../../src/location.txt";
const Config = () => {
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

  const [locationState, setLocation] = useState("");

  useEffect(() => {
    window.LocApi.send("writeToFile", "Hello from React!");

    window.LocApi.receive("writeToFileSuccess", (message) => {
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
  }, [setBlvUpdateSiteState, locationState, setLocation]);

  const registerHandler = async () => {
    let _response, _data;
    _response = await fetch(
      `${process.env.REACT_APP_URL_LOCAL}/api/registerConfig`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          // secretKey: process.env.REACT_APP_SECRET_KEY,
        },
        body: JSON.stringify({
          location:
            locationState.trim() === "bolvaar"
              ? 1
              : locationState.trim() === "pelatin"
              ? 2
              : 3,
          blvUpdateSite: blvUpdateSiteState,
          pelatinUpdateSite: pelatinUpdateSiteState,
          pasagUpdateSite: pasagUpdateSiteState,

          blvUpdateTablo: blvUpdateTabloState,
          pelatinUpdateTablo: pelatinUpdateTabloState,
          pasagUpdateTablo: pasagUpdateTabloState,

          blvTurnONOFFTablo: blvOnOffTabloState,
          pasagTurnONOFFTablo: pasagOnOffTabloState,
          pelatinTurnONOFFTablo: pelatinOnOffTabloState,

          blvUpdateVoip: blvUpdateVoipState,
          pelatinUpdateVoip: pelatinUpdateVoipState,
          pasagUpdateVoip: pasagUpdateVoipState,
        }),
      }
    );

    if (_response.status == 200) {
      window.reloadApp.reloadApplication();
    }
  };

  return (
    <div className="my-10">
      <div className="grid grid-cols-4 my-4">
        <span>پاساژ</span>
        <span>پلاتین</span>
        <span>بلوار</span>
        <span></span>
      </div>

      <div style={{ direction: "rtl" }} className="grid grid-cols-4 ">
        <div> همزمانی با سایت </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={blvUpdateSiteState}
            onChange={(e) => setBlvUpdateSiteState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pelatinUpdateSiteState}
            onChange={() => setPelatinUpdateSiteState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pasagUpdateSiteState}
            onChange={(e) => setPasagUpdateSiteState((prev) => !prev)}
          />
        </div>
      </div>

      <div style={{ direction: "rtl" }} className="grid grid-cols-4 my-4">
        <div> به روز رسانی تابلو</div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={blvUpdateTabloState}
            onChange={() => setBlvUpdateTabloState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pelatinUpdateTabloState}
            onChange={() => setPelatinUpdateTabloState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pasagUpdateTabloState}
            onChange={() => setPasagUpdateTabloState((prev) => !prev)}
          />
        </div>
      </div>

      <div style={{ direction: "rtl" }} className="grid grid-cols-4 ">
        <div> خاموش/روشن تابلو</div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={blvOnOffTabloState}
            onChange={() => setBlvOnOffTabloState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pelatinOnOffTabloState}
            onChange={() => setPelatinOnOffTabloState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pasagOnOffTabloState}
            onChange={() => setPasagOnOffTabloState((prev) => !prev)}
          />
        </div>
      </div>
      <div style={{ direction: "rtl" }} className="grid grid-cols-4 my-4">
        <div> تلفن گویا</div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={blvUpdateVoipState}
            onChange={() => setBlvUpdateVoipState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pelatinUpdateVoipState}
            onChange={() => setPelatinUpdateVoipState((prev) => !prev)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            className="accent-[#ed1c24] ml-1 "
            checked={pasagUpdateVoipState}
            onChange={() => setPasagUpdateVoipState((prev) => !prev)}
          />
        </div>
      </div>

      <div className="my-10">
        <button
          onClick={registerHandler}
          className="bg-gray-900 text-white rounded-md cursor-pointer py-1 px-4"
        >
          ثبت تنظیمات
        </button>
      </div>
    </div>
  );
};

export default Config;
