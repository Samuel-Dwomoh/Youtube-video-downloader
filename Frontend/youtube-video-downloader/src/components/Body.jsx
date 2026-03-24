import React from "react";
import Footer from "./Footer";
import { useState } from "react";

function Body() {
  const [videoUrl, setVideoUrl] = useState("");
  const [preview, setPreview] = useState(null);

  function handleInputChange(e){
    setVideoUrl(e.target.value);
  }

  async function handleSubmit(e){
    e.preventDefault();

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
    link.download = preview.title + ".mp4"; // filename
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
  }
};



  return (
    <main className="bg-red-50 pt-18 pb-8 mx-4">

        <div className="flex items-center flex-col">
            <h1 className="text-2xl font-semibold text-red-600 mb-1">Download Any YouTube Video For Free In Just A Few Clicks!</h1>
            <p className="text-xl pt-2 text-red-500 italic">Free High Quality Downloads</p>
        </div>

        <div className="flex items-center justify-center mt-18 mb-10">

            <form action="" method="POST" className="flex items-center w-full max-w-lg">

                <input type="text" placeholder="Enter YouTube video URL..." className="border-2 border-red-300 rounded-md p-2 w-full h-12 focus:outline-red-400" value={videoUrl} onChange={handleInputChange}/>

                <button type="submit" onClick={handleSubmit} className="bg-red-500 text-white rounded-md px-4 ml-2 py-1 hover:bg-red-600 h-12">Preview</button>
            </form>

        </div>

        {preview && (
        <div className="flex flex-col items-center mt-6 gap-y-4 mb-45">
          <p className="mt-2 font-semibold text-center pb-1 text-lg">{preview.title}</p>
          <div>
            <img
              src={preview.thumbnail}
              alt="Video thumbnail"
              className="w-75 h-auto"
            />
          </div>
        
            <button onClick={handleDownload} className="bg-red-500 text-white rounded-md px-4 ml-2 py-1 hover:bg-red-600 h-12">Download Video</button>
        </div>
      )}

        {/* <Footer /> */}
    </main>
  );
}

export default Body;
