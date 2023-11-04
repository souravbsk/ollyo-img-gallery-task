import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
const ActionHeader = ({ handleDeleteImage, selectdImgID }) => {
  return (
    <div className="flex p-5 bg-[#020F22] text-white py-6 border-b-2 items-center justify-between">
      <div>
        {selectdImgID.length > 0 ? (
          <div className="md:text-2xl flex items-center gap-3 font-bold">
            <button className="bg-blue-600 rounded-md text-white">
              <FaCheck></FaCheck>
            </button>
            <span>
              {selectdImgID.length} {selectdImgID.length > 1 ? "Files" : "File"}{" "}
              Selected
            </span>
          </div>
        ) : (
          <h2 className="text-2xl font-bold">Gallery</h2>
        )}
      </div>
      <div>
        {selectdImgID.length > 0 && (
          <button
            onClick={handleDeleteImage}
            className="text-lg font-semibold text-red-700"
          >
            Delete {selectdImgID.length > 1 ? "Files" : "File"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionHeader;
