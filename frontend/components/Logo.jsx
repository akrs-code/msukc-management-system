import React from "react";
import logo from "../src/assets/msukc.jpg";

const Logo = () => (
  <div className="flex items-center gap-2">
    <img src={logo} alt="MSUKC Logo" className="h-10 w-10 rounded-full" />
    <span className="text-[#202020] font-montserrat text-sm font-bold">
      MSU Karate Club
    </span>
  </div>
);

export default Logo;
