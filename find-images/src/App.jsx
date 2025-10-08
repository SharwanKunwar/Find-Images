import React, { useEffect, useState } from "react";
import "animate.css";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API_KEY = "yGh6m24RUMl09v4VWXukpZG1iuu5n6p7AKlCSfc1Eia6cxMusVInqM3y";

function App() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [find, setFind] = useState("Coding");

  const fetchImage = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: API_KEY,
        },
      };
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${find}&page=${page}&per_page=12`,
        options
      );
      
      setPhoto([
        ...photo,
        ...response.data.photos
      ]);
    } catch (err) {
      toast.error("Faild to fetch images");
    } finally {
      setLoading(false);
    }}

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

  const loadMore = () => {
    setPage(page+1);
  }

  const search = (e) => {
    e.preventDefault();
    const q = e.target[0].value.trim();
     if (q !== find) {
    setFind(q);
    setPage(1);
    setPhoto([]);  // Clear previous photos on new search
  }
  }

  const viewImage = (src) => {
    window.open(src, '_blank');
  }
  

  useEffect(() => {
    fetchImage();
  }, [find,page]);

  return (
    <>
      {/* title */}
      <div className="bg-gray-100 lg:min-h-screen flex flex-col items-center py-8 gap-8 animate__animated animate__fadeIn">
        <div className=" flex gap-3 justify-center items-center">
            <img src="/image.png" alt="img" width={40} height={40}/>
            <h1 className="lg:text-4xl text-2xl font-bold text-indigo-600"> Search For Images</h1>
        </div>

        <form onSubmit={search} className="flex gap-1 justify-center items-center">
          <input
            type="text"
            
            placeholder="Search Images"
            className="border-none outline-none bg-white rounded-full lg:w-[500px] w-[250px] h-[40px] pl-5"
          />
          <button type="submit" className="bg-white hover:bg-gradient-to-br from-indigo-600 to-fuchsia-800 via-indigo-600 rounded-full w-[40px] h-[40px] hover:scale-101 transition-transform ">
            <i className="ri-search-line text-2xl hover:text-white"></i>
          </button>
        </form>


        {
          photo.length === 0 && !loading && find !== "" && (
            <div className="lg:w-6/12 w-[95%] h-[500px] flex justify-center items-center">
              <img src="/404.png" alt="No images found" width={500} height={500} className="rounded-xl" />
            </div>
          )
        }

        {/* grid-images */}
        <div className="grid lg:grid-cols-4 lg:gap-12 gap-8 lg:w-9/12 w-[90%]">
       
          {photo.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg flex flex-col justify-center items-center object-center object-cover"
            >
              <img
                src={item.src.medium}
                alt={item.alt}
                className="rounded-md w-full h-[250px] hover:scale-103 transition-transform duration-300"
              />
              <div className=" w-full h-[80px] p-1">
                <h1 className="font-medium capitalize text-neutral-400">{item.photographer}</h1>
                <div className=" flex gap-3 justify-center items-center px-1">
                  <button onClick={()=>viewImage(item.src.original)} className="bg-gradient-to-br from-indigo-500 to-orange-400 via-indigo-500 w-full h-[35px] mt-2 rounded-sm text-white hover:bg-gradient-to-bl hover:from-indigo-700 hover:to-cyan-300 hover:via-indigo-500"><i className="ri-eye-line pr-1"></i>View</button>
                  <button onClick={() => downloadImage(item.src.original, item.photographer)} className="bg-gradient-to-br from-indigo-500 to-cyan-400 via-indigo-500 w-full h-[35px] mt-2 rounded-sm text-white hover:bg-gradient-to-bl hover:from-indigo-700 hover:to-orange-300 hover:via-indigo-500"><i className="ri-download-2-line"></i> Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <i className="ri-loader-2-line animate-spin text-4xl text-gray-400"></i>
        )}

        {
          photo.length > 0 &&
          <button onClick={loadMore} className="bg-gradient-to-br from-indigo-500 to-orange-400 via-indigo-500 w-[200px] h-[40px] mt-10 rounded-sm text-white transition-transform duration-300 hover:bg-gradient-to-bl hover:from-indigo-700 hover:to-orange-300 hover:via-indigo-500">Load More</button>
        }
        <div className=" text-[13px] text-neutral-400">Developed by Sharwan jung kunwar</div>
        <ToastContainer />
      </div>
    </>
  );
}


export default App;
