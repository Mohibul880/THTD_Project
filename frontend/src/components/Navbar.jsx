import React, { useState } from "react";

import logo from "../images/profile.jpg";

const Navbar = ({ setSearchTerm }) => {

  const [search, setSearch] = useState("");



  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    if (setSearchTerm) {
      setSearchTerm(value);
    }

  };



  return (

    <nav className="w-full bg-black shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">



        {/* LEFT SIDE LOGO */}

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />

          <div>

            <h1 className="text-white text-xl font-bold">
              THTD Society
            </h1>

            <p className="text-gray-300 text-sm">
              Health & Technical Development
            </p>

          </div>

        </div>



        {/* RIGHT SIDE SEARCH BAR */}

        <div className="flex items-center">

          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={handleSearch}
            className="px-4 py-2 rounded-lg outline-none border border-gray-400 w-[250px]"
          />

        </div>

      </div>

    </nav>

  );

};

export default Navbar;