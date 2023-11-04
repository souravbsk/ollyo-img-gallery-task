import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ActionHeader from "./components/ActionHeader/ActionHeader";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [thumbnails, setThumbnails] = useState([]);
  const [selectdImgID, setSeletedImgID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // load images from static data =================>
  useEffect(() => {
    setIsLoading(true);
    fetch("/imageData.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setThumbnails(data);
          setIsLoading(false);
        }
      });
  }, []);


  // select images =================>

  const handleSelected = (id) => {
    const existId = selectdImgID.find((imgID) => imgID == id);
    if (!existId) {
      setSeletedImgID([...selectdImgID, id]);
    } else {
      const filterID = selectdImgID.filter((imgID) => imgID !== id);
      setSeletedImgID(filterID);
    }
  };


  //delete selected image =================>
  const handleDeleteImage = () => {
    const updateDeleteImage = thumbnails.filter((img) => {
      const findImgID = selectdImgID.find((id) => id == img?.id);
      return !findImgID;
    });
    setThumbnails(updateDeleteImage);
    setSeletedImgID([]);
  };

  return (
    <div className="max-w-full md:w-9/12 mx-auto border ">
      <ActionHeader
        setThumbnails={setThumbnails}
        thumbnails={thumbnails}
        handleDeleteImage={handleDeleteImage}
        selectdImgID={selectdImgID}
      ></ActionHeader>
      <ImageGallery
        isLoading={isLoading}
        selectdImgID={selectdImgID}
        handleSelected={handleSelected}
        setThumbnails={setThumbnails}
        thumbnails={thumbnails}
      ></ImageGallery>
    </div>
  );
}

export default App;
