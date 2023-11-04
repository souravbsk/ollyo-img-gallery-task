import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";

const Image = ({
  image,
  className,
  handleDragStart,
  handleDrop,
  index,
  dragging,
  draggedIndex,
  handleSelected,
  selectdImgID,
}) => {
  return (
    <div
      draggable={true}
      onDragStart={() => handleDragStart(image)}
      onDrop={() => handleDrop(index)}
      className={`relative ${className} border-4 rounded-xl overflow-hidden group ${
        dragging && Number(draggedIndex) === Number(image.id)
          ? "slide-animation"
          : ""
      }`}
    >
      <div
        className={` ${
          selectdImgID.find((id) => id == image?.id) && "opacity-20 cursor-move"
        } absolute inset-0 cursor-move bg-black/50 opacity-0 transition-opacity group-hover:opacity-100`}
      ></div>
      <img
        className={`w-full opacity-100 transition-opacity ${
          selectdImgID.find((id) => id == image?.id) && "opacity-70"
        }`}
        src={image.image}
        alt={image.id}
      />
      <div
        className={`${
          selectdImgID.find((id) => id == image?.id) && "static opacity-100"
        } absolute  top-8 left-8 z-50   transform -translate-x-1/2 -translate-y-1/2 rounded-md opacity-0 transition-opacity group-hover:opacity-100`}
      >
        <button
          onClick={() => handleSelected(image?.id)}
          className={`w-5 ${
            selectdImgID.find((id) => id == image?.id)
              ? "bg-blue-600"
              : "bg-white"
          }  text-white flex items-center justify-center rounded-md h-5`}
        >
          {selectdImgID.find((id) => id == image?.id) ? (
            <FaCheck></FaCheck>
          ) : (
            ""
          )}
        </button>
      </div>

      {dragging && Number(draggedIndex) === Number(image.id) && (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-white border-2 border-dashed rounded-lg">
          Drop Here
        </div>
      )}
    </div>
  );
};

export default Image;
