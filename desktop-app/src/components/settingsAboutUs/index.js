import React, { useState, useEffect } from "react";

const SettingsAboutUs = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [branchAddress1, setBranchAddress1] = useState("");
  const [branchAddress2, setBranchAddress2] = useState("");

  const [branchPhone1, setBranchPhon1] = useState("");
  const [branchPhone2, setBranchPhon2] = useState("");

  const [email, setEmail] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  useEffect(() => {
    let _response, _data;

    const fetchData = async () => {
      try {
        _response = await fetch(`${process.env.REACT_APP_URL}/api/getConfig`);
        if (!_response.ok) {
          throw new Error("err occurred...");
        }
        _data = await _response.json();
        setBranchAddress1(_data.address1);
        setBranchAddress2(_data.address2);
        setAboutUs(_data.aboutUs);
        setBranchPhon1(_data.phone1);
        setBranchPhon2(_data.phone2);
        setEmail(_data.email);
        setWorkHours(_data.workHours);
      } catch (error) {
        console.log(error);

        switch (_response.status) {
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
      }
    };
    fetchData();
  }, []);

  const submitHandlr = async () => {
    setIsUpdating(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL}/api/registerConfig`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            secretKey: process.env.REACT_APP_SECRET_KEY,
          },
          body: JSON.stringify({
            branchAddress1,
            branchAddress2,
            branchPhone1,
            branchPhone2,
            email,
            workHours,
            aboutUs,
          }),
        }
      );

      if (!_response.ok) {
        setIsUpdating(false);
        throw new Error("err occurred...");
      }
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);

      switch (_response.status) {
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
    }
  };
  return (
    <div>
      <div className="">
        <div className="w-fit mx-auto">
          <div
            style={{ direction: "rtl" }}
            className="text-right pr-1 mt-2 pb-1 my-auto text-sm font-bold text-gray-700"
          >
            آدرس شعبه یک :
          </div>
          <div>
            <textarea
              className="rounded-lg py-2 px-3"
              style={{ direction: "rtl" }}
              rows={2}
              cols={55}
              value={branchAddress1}
              onChange={(e) => setBranchAddress1(e.target.value)}
            />
          </div>
        </div>
        <div className="w-fit mx-auto">
          <div
            style={{ direction: "rtl" }}
            className="text-right pr-1 mt-2 pb-1 my-auto text-sm font-bold text-red-700"
          >
            آدرس شعبه دو :
          </div>
          <div>
            <textarea
              className="rounded-lg py-2 px-3"
              style={{ direction: "rtl" }}
              rows={2}
              cols={55}
              value={branchAddress2}
              onChange={(e) => setBranchAddress2(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2  w-fit mx-auto my-2 "
        >
          <div className=" my-auto text-sm font-bold text-gray-700">
            تلفن شعبه یک
          </div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={branchPhone1}
              onChange={(e) => setBranchPhon1(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2  w-fit mx-auto my-2 "
        >
          <div className=" my-auto text-sm font-bold text-red-700">
            تلفن شعبه دو
          </div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={branchPhone2}
              onChange={(e) => setBranchPhon2(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2 w-fit mx-auto "
        >
          <div className=" my-auto text-sm font-bold text-gray-700">ایمیل</div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div style={{ direction: "rtl" }} className=" w-fit mx-auto my-2 ">
          <div className=" text-right my-auto text-sm font-bold pr-1 mt-2 pb-1 text-red-700">
            زمان پاسخگویی
          </div>
          <div>
            <textarea
              className="rounded-lg py-2 px-3"
              rows={1}
              cols={55}
              value={workHours}
              onChange={(e) => setWorkHours(e.target.value)}
            />
          </div>
        </div>
        <div style={{ direction: "rtl" }} className="  w-fit mx-auto my-1">
          <div className=" text-right my-auto text-sm font-bold pr-1 mt-2 pb-1 text-gray-700 ">
            درباره ی ما :
          </div>
          <div>
            <textarea
              className="rounded-lg py-2 px-3"
              style={{ direction: "rtl" }}
              rows={5}
              cols={55}
              value={aboutUs}
              onChange={(e) => setAboutUs(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={submitHandlr}
          style={{ direction: "rtl" }}
          className={`px-2  py-1  text-[14px] shadow-md  shadow-red-900 rounded-xl  font-bold bg-black text-red-700
          ${isUpdating && "animate-pulse"}
          `}
        >
          {isUpdating ? "در حال ذخیره اطلاعات ..." : " ثبت اطلاعات"}
        </button>
      </div>
    </div>
  );
};

export default SettingsAboutUs;
