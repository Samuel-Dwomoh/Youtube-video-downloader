import React from "react";

function Header() {
  return (
    <header className="p-4 text-white font-semibold bg-red-500">

      <div className="flex justify-between mx-4">

        <div>
            <h1 className="text-xl tracking-wide">Youtube Video Downloader</h1>
        </div>

        <div>
            <button>dark mode</button>
        </div>

      </div>

    </header>
  );
}

export default Header;
