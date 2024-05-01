import React, { useEffect } from "react";
import Adds from "../../store/Adds";
import { useParams } from "react-router-dom";

const DetailsAdd = () => {
  const { Details, DetailsRequest } = Adds();
  const { addID } = useParams();

  useEffect(() => {
    if (addID) {
      DetailsRequest(addID);
    }
  }, [addID, DetailsRequest]);

  return (
    <div className="bg-yellow-300 min-h-screen">
      <div className="container mx-auto py-10 px-4 lg:px-0 max-w-5xl">
        <h1 className="text-center font-bold text-3xl lg:text-4xl mb-6 text-black">
          Add Details
        </h1>
        {Details ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                className="w-full rounded-lg mb-6 lg:mb-0"
                src={Details[0]["image"]}
                alt="Ad Image"
              />
            </div>
            <div className="text-black lg:pl-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Location:</h2>
                  <p>
                    {Details[0]["locationName"]},{" "}
                    {Details[0]["subLocationName"]}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Category:</h2>
                  <p>{Details[0]["categoryName"]}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Subcategory:</h2>
                  <p>{Details[0]["subcategoryName"]}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Features:</h2>
                  <p>{Details[0]["features"]}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Condition:</h2>
                  <p>{Details[0]["condition"]}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Price:</h2>
                  <p>&#2547; {Details[0]["price"]}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Contact:</h2>
                  <p>{Details[0]["phone"]}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Seller:</h2>
                  <p>{Details[0]["userName"]}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <hr className="w-full my-4 border-black" />
              <h2 className="text-lg font-semibold mb-2">Description:</h2>
              <p>{Details[0]["description"]}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DetailsAdd;
