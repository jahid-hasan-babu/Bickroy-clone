import React, { useEffect, useState } from "react";
import AddsSkeleton from "../../skeleton/AddsSkeleton";
import AddStore from "../../store/Adds";
import Pagination from "react-js-pagination";

const Adds = () => {
  const { AddsList, AddsListRequest } = AddStore();

  useEffect(() => {
    AddsListRequest();
  }, []);

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  if (!AddsList) {
    return <AddsSkeleton />;
  }

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAddsList = AddsList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-center my-2 text-green-500">
          All adds
        </h1>

        <div className="grid grid-cols-1 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentAddsList.map((item, i) => (
            <div className="text-center p-2" key={i}>
              <div className="rounded-lg border border-gray-300 p-4">
                <img className="rounded-lg" src={item.img1} alt="image" />
                <div className="text-left py-5">
                  <p>
                    Price: {item.price} <span>&#2547;</span>{" "}
                  </p>
                </div>
              </div>
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
            itemClass="px-3 py-2 rounded-md mr-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
            linkClass="flex items-center justify-center"
            activeLinkClass="bg-green-500 px-3 rounded-md text-white"
            prevPageText="Previous"
            nextPageText="Next"
            hideFirstLastPages={true}
            innerClass="pagination flex items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Adds;