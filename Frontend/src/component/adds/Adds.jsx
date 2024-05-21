import React, { useEffect, useState } from "react";
import AddsSkeleton from "../../skeleton/AddsSkeleton";
import AddStore from "../../store/Adds";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const Adds = () => {
  const { AddsList, AddsListRequest } = AddStore();

  useEffect(() => {
    AddsListRequest();
  }, []);

  const [activePage, setActivePage] = useState(
    parseInt(sessionStorage.getItem("activePage")) || 1
  ); // Get the active page from sessionStorage or default to 1
  const itemsPerPage = 8; // Number of items per page

  if (!AddsList) {
    return <AddsSkeleton />;
  }

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAddsList = AddsList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    sessionStorage.setItem("activePage", pageNumber); // Store the active page in sessionStorage
  };

  return (
    <div className="bg-slate-300">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center py-10">
          <h1 className="text-4xl font-bold text-center my-5 text-black">
            All adds
          </h1>

          <div className="grid text-black grid-cols-1 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentAddsList.map((item, i) => (
              <div className="text-center text-black p-2" key={i}>
                <Link to={`/details/${item["_id"]}`}>
                  <div className="rounded-lg border-[3px] border-black p-4 bg-yellow-500">
                    <img
                      className="rounded-lg h-[160px] w-full"
                      src={item.image}
                      alt="image"
                    />
                    <div className="text-left py-5 font-bold">
                      <p className="text-xl">
                        {item.features} ({item.condition})
                      </p>
                      <p>
                        {item.locationName} , {item.subcategoryName}
                      </p>
                      <p>
                        TK , {item.price} <span>&#2547;</span>{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={AddsList.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="px-3 py-2 rounded-md mr-2 bg-black border border-gray-300 text-yellow-500 "
              linkClass="flex items-center justify-center"
              activeLinkClass="bg-yellow-500 px-3 rounded-md text-white"
              prevPageText="Previous"
              nextPageText="Next"
              hideFirstLastPages={true}
              innerClass="pagination flex items-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adds;
