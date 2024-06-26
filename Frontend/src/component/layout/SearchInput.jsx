import React from "react";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import AddStore from "../../store/Adds";

const SearchInput = () => {
  const { SearchKeyword, SetSearchKeyword } = AddStore();

  const handleSearchInputChange = (e) => {
    SetSearchKeyword(e.target.value);
  };

  return (
    <div className="bg-slate-300 items-center text-center py-11">
      <div className="flex items-center justify-center text-center text-black font-bold text-2xl p-5">
        <MdLocationPin className="inline-block text-black mr-2" />
        <h1 className="inline-block text-black">All of Bangladesh</h1>
      </div>
      <div className="flex items-center justify-center">
        <input
          onChange={handleSearchInputChange}
          value={SearchKeyword}
          className="w-1/2 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          type="search"
          placeholder="Search..."
        />
        <Link
          to={SearchKeyword.length > 0 ? `/by-keyword/${SearchKeyword}` : "/"}
          className="flex items-center"
        >
          <button className="px-4 py-4 bg-yellow-500 text-black rounded-r-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
            <FaSearch />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchInput;
