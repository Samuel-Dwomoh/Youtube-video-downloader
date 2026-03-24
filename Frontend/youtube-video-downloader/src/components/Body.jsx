import React from "react";
import Footer from "./Footer";
import load from "/public/load.svg";
import download from "/public/download.svg";
import { useState } from "react";

function Body() {
  const [videoUrl, setVideoUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false)

  function handleInputChange(e){
    setVideoUrl(e.target.value);
  }

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });

      const data = await response.json();
      setPreview(data); 
    } catch (error) {
      console.error("Error fetching preview:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl }),
    });

    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = preview.title + ".mp4";
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
  }
};



  return (
    <main className="pt-16 pb-8 px-4 min-h-screen">

  {/* HERO TEXT */}
  <div className="flex items-center flex-col text-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600">
      Download any
    </h1>
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600">
      YouTube video
    </h1>
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600">
      in seconds.
    </h1>

    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 mt-2">
      <p className="text-sm sm:text-base text-red-600 italic">High Quality Downloads.</p>
      <p className="text-sm sm:text-base text-red-600 italic">Always free.</p>
      <p className="text-sm sm:text-base text-red-600 italic">No watermarks</p>
    </div>
  </div>

  {/* FORM */}
  <div className="flex justify-center mt-10 mb-10">
    <form className="flex flex-col sm:flex-row w-full max-w-lg gap-2 sm:gap-0">

      <input
        type="text"
        placeholder="Paste YouTube video URL here..."
        className="border-2 border-red-300 rounded-lg px-3 py-3 w-full focus:outline-red-400 mr-2"
        value={videoUrl}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-red-500 text-white rounded-md flex items-center justify-center gap-2 px-5 py-3 hover:bg-red-600 w-full sm:w-auto"
      >
        <img src={load} alt="" />
        Preview
      </button>
    </form>
  </div>

  {/* LOADING */}
  {loading && (
    <div className="flex justify-center mt-6">
      <div className="loader"></div>
    </div>
  )}

  {/* PREVIEW */}
  {preview && !loading && (
    <div className="flex flex-col items-center mt-10 gap-4 mb-20 px-2">

      <p className="font-bold text-center text-base sm:text-lg md:text-xl text-red-700">
        {preview.title}
      </p>

      <img
        src={preview.thumbnail}
        alt="Video thumbnail"
        className="w-full max-w-md rounded-lg shadow-md"
      />

      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-3 bg-red-500 text-white rounded-md px-4 py-3 w-full max-w-md hover:bg-red-600"
      >
        <img src={download} alt="" />
        Download Video
      </button>
    </div>
  )}

</main>
  );
}

export default Body;
