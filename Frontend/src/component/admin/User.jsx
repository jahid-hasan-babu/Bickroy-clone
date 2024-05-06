import React, { useEffect, useState } from "react";
import AdminSkeleton from "./../../skeleton/AdminSkeleton";
import AdminStore from "../../store/AdminStore";
import Pagination from "react-js-pagination";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import NoData from "../../assets/img/no-data.jpg";

const User = () => {
  const { userList, totalUserRequest, deleteUserByAdminRequest } = AdminStore();

  useEffect(() => {
    totalUserRequest(); // Fetches data
  }, []);

  const [currentPage, setCurrentPage] = useState(
    parseInt(sessionStorage.getItem("activePage")) || 1
  );
  const [itemsPerPage] = useState(8); // Number of items per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to false once data is fetched
  }, [userList]); // Update loading state when userList changes

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList
    ? userList.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    sessionStorage.setItem("activePage", pageNumber); // Store the active page in sessionStorage
  };

  // Delete function
  const onDelete = async (userId) => {
    // Use SweetAlert to confirm the delete action
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUserByAdminRequest(userId);
        if (res.status === "success") {
          // Show success message
          Swal.fire("Deleted!", "User has been deleted.", "success");
          // Reload data after deletion
          await totalUserRequest();
        } else {
          // Show error message
          Swal.fire("Failed!", "Failed to delete user.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="bg-yellow-500 text-center rounded-xl p-5 mb-8">
        <h2 className="text-xl font-bold text-black">
          Total Users: {userList ? userList.length : 0}
        </h2>
      </div>
      <div className="bg-black rounded-lg text-center shadow-md p-8 text-yellow-500">
        {loading ? (
          <AdminSkeleton />
        ) : userList && userList.length > 0 ? (
          <>
            <h1 className="font-bold custom-text-design mb-6 text-2xl md:text-3xl lg:text-4xl">
              All Users
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="text-center items-center">
                    <th className="px-4 py-2 ">Name</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Sub Location</th>
                    <th className="px-4 py-2 ">Phone</th>
                    <th className="px-4 py-2 text-left">Created Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.locationName}</td>
                      <td className="px-4 py-2">{item.subLocationName}</td>
                      <td className="px-4 py-2">{item.phone}</td>
                      <td className="px-4 py-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 flex text-2xl items-center justify-center">
                        <button
                          className="text-red-500"
                          onClick={() => onDelete(item["_id"])} // Pass userId only
                        >
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
                totalItemsCount={userList.length}
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
            <img src={NoData} alt="No Data" className="h-[50vh] w-full" />
            <p className="text-lg pt-5">No data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
