import React, { useEffect, useState } from "react";
import CreateAddsStore from "../../store/CreateAddsStore";
import AdminSkeleton from "./../../skeleton/AdminSkeleton";
import Pagination from "react-js-pagination";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const AddList = () => {
  const { UserAddsList, UserAddListRequest } = CreateAddsStore();
  const [currentPage, setCurrentPage] = useState(
    parseInt(sessionStorage.getItem("activePage")) || 1
  );
  const [itemsPerPage] = useState(5); // Number of items per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await UserAddListRequest();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = UserAddsList
    ? UserAddsList.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    sessionStorage.setItem("activePage", pageNumber); // Store the active page in sessionStorage
  };

  return (
    <div className="container mx-auto items-center my-8 px-4">
      <div className="max-w-full md:max-w-4xl mx-auto">
        <div className="bg-black rounded-lg text-center shadow-md p-8 text-yellow-500">
          {loading ? (
            <AdminSkeleton />
          ) : UserAddsList && UserAddsList.length > 0 ? (
            <>
              <div>
                <h1 className="font-bold custom-text-design mb-6 text-2xl md:text-3xl lg:text-4xl">
                  My Adds
                </h1>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 ">Image</th>
                      <th className="text-left px-4 py-2">Category</th>
                      <th className="text-left px-4 py-2">Features</th>
                      <th className="text-left px-4 py-2">Price</th>
                      <th className="text-left px-4 py-2">Created Date</th>
                      <th className="text-left px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="px-2 py-2">
                          <img
                            src={item.image}
                            alt="Add"
                            className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full"
                          />
                        </td>
                        <td className="px-4 py-2 ">{item.categoryName}</td>
                        <td className="px-4 py-2">{item.features}</td>
                        <td className="px-4 py-2">{item.price}</td>

                        <td className="px-4 py-2">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-3xl">
                          <button className="text-green-500 pr-3">
                            <FiEdit />
                          </button>
                          <button className="text-red-500">
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="mt-4">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={UserAddsList.length}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass="px-3 py-2 rounded-md mr-2 bg-black border border-gray-300 text-yellow-500"
                  linkClass="flex items-center justify-center"
                  activeLinkClass="bg-yellow-500 px-3 rounded-md text-white"
                  prevPageText="Previous"
                  nextPageText="Next"
                  hideFirstLastPages={true}
                  innerClass="pagination flex items-center"
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                src="/user-logo.png"
                alt="User Logo"
                className="w-24 h-24 mb-4"
              />
              <p className="text-lg">No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddList;
