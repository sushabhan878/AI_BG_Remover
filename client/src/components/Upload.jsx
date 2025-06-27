import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="pb-16">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibld bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16">
        See The Magic. Try NOW!
      </h1>
      <div className="text-center mb-24">
        <input
          onChange={(e) => removeBg(e.target.files[0])}
          type="file"
          id="upload2"
          accept="image/*"
          hidden
        />
        <label
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
          htmlFor="upload2"
        >
          <img width={20} src={assets.upload_btn_icon} alt="Upload Icon" />
          <p className="text-white font-semibold text-sm">Upload your Image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
