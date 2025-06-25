import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
      <img src={assets.logo} alt="Logo" />
      <p className="flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @AI_BG_Remover | All right reserved.
      </p>
      <div className="flex gap-2">
        <img width={40} src={assets.facebook_icon} alt="Facebook Icon" />
        <img width={40} src={assets.twitter_icon} alt="Twitter Icon" />
        <img width={40} src={assets.google_plus_icon} alt="Google Icon" />
      </div>
    </div>
  );
};

export default Footer;
