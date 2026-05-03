import React from "react";
import { NavLink, Link } from "react-router-dom";

const Menu = () => {
  return (
    <div
      style={{ webkitAppRegion: "drag" }}
      className={` w-full  pt-2 bg-rose-200 bg-opacity-60 rounded-t-3xl `}
    >
      <ul
        className="flex flex-row-reverse justify-center  py-3 -mt-2 text-[16px] text-gray-700  font-bold 
    "
      >
        <NavLink
          style={{ webkitAppRegion: "no-drag" }}
          className={({ isActive }) => (isActive ? "text-red-700 " : "")}
          to="/"
        >
          <li className="font-bold ">خانه</li>
        </NavLink>

        <NavLink
          style={{ webkitAppRegion: "no-drag" }}
          className={({ isActive }) => (isActive ? "text-red-700 " : "")}
          to="/settings-about-us"
        >
          <li className="mx-14 font-bold">درباره صرافی</li>
        </NavLink>

        <NavLink
          style={{ webkitAppRegion: "no-drag" }}
          className={({ isActive }) => (isActive ? "text-red-700 " : "")}
          to="/config"
        >
          <li className="font-bold"> تنظیمات</li>
        </NavLink>

        <Link
          style={{ webkitAppRegion: "no-drag" }}
          onClick={() => window.reloadApp.reloadApplication()}
        >
          <li className="font-bold mx-14 hover:text-red-700">بارگذاری مجدد</li>
        </Link>

        <NavLink
          style={{ webkitAppRegion: "no-drag" }}
          onClick={() => {
            window.closeApp.closeApplication();
          }}
          className={({ isActive }) => (isActive ? "text-red-700 " : "")}
          to="/close"
        >
          <li className="hover:text-red-700">خروج</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Menu;
