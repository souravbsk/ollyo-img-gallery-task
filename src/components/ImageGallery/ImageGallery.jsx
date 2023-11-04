import React, { useEffect, useState } from "react";
import Image from "../Image/Image";
import { FaImage } from "react-icons/fa";
const ImageGallery = ({
  thumbnails,
  setThumbnails,
  handleSelected,
  selectdImgID,
  isLoading,
}) => {
  const [dragging, setDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Handle submit new images
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    const newImages = Array.from(selectedFiles).map((file, index) => {
      const id = thumbnails.length + index + 1;
      const thumbnail = URL.createObjectURL(file);

      return { id, image: thumbnail };
    });

    setThumbnails([...thumbnails, ...newImages]);
  };

  // Handle drag image start
  const handleDragStart = (image) => {
    setDragging(true);
    setDraggedImage(image);
  };

  // Handle drag image over
  const handleDragOver = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.alt && setDraggedIndex(e?.target?.children[0]?.alt);
  };

  // Handle drop image 
  const handleDrop = (targetIndex) => {
    setDragging(false);

    if (draggedImage) {
      const updatedImages = thumbnails.filter(
        (image) => image.id !== draggedImage.id
      );
      updatedImages.splice(targetIndex, 0, draggedImage);

      setThumbnails(updatedImages);
      setDraggedImage(null);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className=" flex justify-center  items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          className="p-5 grid bg-[#151d35ef] lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4"
        >
          {thumbnails.map((image, index) => (
            <Image
              key={index}
              index={index}
              image={image}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              dragging={dragging}
              draggedIndex={draggedIndex}
              handleSelected={handleSelected}
              selectdImgID={selectdImgID}
              className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            ></Image>
          ))}

          <div className=" bg-[#FAFBFB] rounded-lg flex items-center  text-center justify-center flex-col p-5 w-full border-dotted h-full border-2">
            <div className="relative border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 w-full transition-colors ease-linear">
              <input
                type="file"
                multiple
                name="images"
                id="images"
                className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                title="Try to upload photos..."
                onChange={handleFileChange}
              />
              <div className="flex items-center flex-col gap-3">
                <FaImage size={20}></FaImage>
                <p className="font-semibold text-[#797A7B]">Add Images</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
