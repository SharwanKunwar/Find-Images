import React, { useEffect, useState } from "react";
import "animate.css";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API_KEY = "yGh6m24RUMl09v4VWXukpZG1iuu5n6p7AKlCSfc1Eia6cxMusVInqM3y";

function App() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: API_KEY,
        },
      };
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=people&page=1&per_page=12`,
        options
      );
      console.log(response);
      setPhoto(response.data.photos);
    } catch (err) {
      toast.error("Faild to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (src, name) => {
    const image = await fetch(src);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `${name.replace(/\s+/g, "_")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      {/* title */}
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-8 animate__animated animate__fadeIn">
        <h1 className="text-4xl font-bold text-indigo-600">📸 Image Gallery</h1>

        <form className="flex gap-1 justify-center items-center">
          <input
            type="text"
            placeholder="Search Images"
            className="border-none outline-none bg-white rounded-full lg:w-[500px] w-[250px] h-[40px] pl-5"
          />
          <button className="bg-white hover:bg-gradient-to-br from-indigo-600 to-fuchsia-800 via-indigo-600 rounded-full w-[40px] h-[40px] hover:scale-101 transition-transform ">
            <i className="ri-search-line text-2xl hover:text-white"></i>
          </button>
        </form>

        {/* grid-images */}
        <div className="grid lg:grid-cols-4 lg:gap-12 gap-8 w-9/12">
          {photo.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-300 rounded-lg flex flex-col justify-center items-center object-center object-cover"
            >
              <img
                src={item.src.medium}
                alt={item.alt}
                className="rounded-md w-full h-[250px] hover:scale-103 transition-transform duration-300"
              />
              <div className=" w-full h-[75px] p-1">
                <h1 className="font-medium capitalize">{item.photographer}</h1>
                <button
                  onClick={() =>
                    downloadImage(item.src.original, item.photographer)
                  }
                  className="bg-gradient-to-br from-indigo-500 to-cyan-400 via-indigo-500 w-full h-[30px] mt-2 rounded-sm text-white hover:bg-gradient-to-bl hover:from-indigo-700 hover:to-cyan-300 hover:via-indigo-500"
                >
                  <i class="ri-download-2-line"></i> Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <i class="ri-loader-2-line animate-spin text-4xl text-gray-400"></i>
        )}
        <button className="bg-gradient-to-br from-indigo-500 to-cyan-400 via-indigo-500 w-[200px] h-[30px] mt-2 rounded-sm text-white transition-transform duration-300 hover:bg-gradient-to-bl hover:from-indigo-700 hover:to-cyan-300 hover:via-indigo-500">More</button>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
