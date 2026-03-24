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
    <main className="pt-18 pb-8 mx-4 h-screen">

        <div className="flex items-center flex-col ">
            <h1 className="text-6xl tracking-wide font-bold text-red-600 mb-1">Download any</h1>
            <h1 className="text-6xl tracking-wide font-bold text-red-600 mb-1">YouTube video</h1>
            <h1 className="text-6xl tracking-wide font-bold text-red-600 mb-1">in seconds.</h1>
            <div className="flex gap-x-1">
            <p className="text-lg pt-2 text-red-600 italic">High Quality Downloads.</p>
            <p className="text-lg pt-2 text-red-600 italic">Always free.</p>
            <p className="text-lg pt-2 text-red-600 italic">No watermarks</p>
            </div>
        </div>

        <div className="flex items-center justify-center mt-14 mb-10">

            <form action="" method="POST" className="flex items-center w-full max-w-lg">

                <input type="text" placeholder="Paste YouTube video URL here..." className="border-2 border-red-300 rounded-lg p-2 w-full h-13 focus:outline-red-400 px-3 py-5" value={videoUrl} onChange={handleInputChange}/>

                <button type="submit" onClick={handleSubmit} className="bg-red-500 text-white rounded-md gap-x-2 pr-8 ml-2 py-1 hover:bg-red-600 h-12 flex items-center hover:scale-103"><img src={load} alt="" className="pl-2" />Preview</button>
            </form>

        </div>

        {loading && (
          <div className="mt-6">
          <div className="loader"></div>
          </div>
        )}

        {preview && !loading && (
        <div className="flex flex-col items-center mt-14 gap-y-4 mb-45">
          <p className="mt-2 font-bold text-center pb-1 text-xl text-red-700 ">{preview.title}</p>
          <div>
            <img
              src={preview.thumbnail}
              alt="Video thumbnail"
              className="w-lg h-auto"
            />
          </div>
        
            <button onClick={handleDownload} className="flex justify-center items-center gap-x-3 bg-red-500 text-white rounded-md px-4 ml-2 py-1 w-lg mb-5 hover:bg-red-600 h-12"> <img src={download} alt="" />Download Video</button>
        </div>
      )}

        {/* <Footer /> */}
    </main>
  );
}

export default Body;
