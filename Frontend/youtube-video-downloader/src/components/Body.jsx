import React from "react";
import Footer from "./Footer";
import { useState } from "react";

function Body() {
  const [videoUrl, setVideoUrl] = useState("");

  function handleInputChange(e){
    setVideoUrl(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();

    try {}
    
  }




  return (
    <main className="bg-red-50 pt-18 pb-8 mx-4">

        <div className="flex items-center flex-col">
            <h1 className="text-2xl font-semibold text-red-600 mb-1">Download Any YouTube Video For Free In Just A Few Clicks!</h1>
            <p className="text-xl pt-2 text-red-500 italic">Free High Quality Downloads</p>
        </div>

        <div className="flex items-center justify-center mt-18 mb-10">

            <form action="" method="POST" className="flex items-center w-full max-w-lg">

                <input type="text" placeholder="Enter YouTube video URL..." className="border-2 border-red-300 rounded-md p-2 w-full h-12 focus:outline-red-400" value={videoUrl} onChange={handleInputChange}/>

                <button type="submit" onClick={handleSubmit} className="bg-red-500 text-white rounded-md px-4 ml-2 py-1 hover:bg-red-600 h-12">Download</button>
            </form>

        </div>

        <div>

            <div>

            </div>
            
            <div></div>
        </div>

        <Footer />
    </main>
  );
}

export default Body;
