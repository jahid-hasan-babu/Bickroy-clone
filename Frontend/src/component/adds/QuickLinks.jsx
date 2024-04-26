import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-xl py-10 my-2 font-bold text-yellow-500">
        Quick Links
      </h1>
      <div className="grid grid-cols-1 mt-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
        <div className="rounded-lg border text-yellow-500 border-gray-300 p-4 bg-black">
          <h1 className="font-bold ">Electronics</h1>
          <Link>DeskTop computer</Link>
          <br />
          <Link>Laptops</Link>
          <br />
          <Link>TVs</Link>
        </div>

        <div className="rounded-lg border border-gray-300 p-4 text-yellow-500 bg-black">
          <h1 className="font-bold ">Property</h1>
          <Link>Apartments For Sale</Link>
          <br />
          <Link>LandApartment</Link>
          <br />
          <Link>Rentals</Link>
        </div>

        <div className="rounded-lg border border-gray-300 p-4 text-yellow-500 bg-black">
          <h1 className="font-bold ">Jobs</h1>
          <Link>Sales Executive </Link>
          <br />
          <Link>Marketing</Link>
          <br />
          <Link>Executive</Link>
        </div>
        <div className="rounded-lg border border-gray-300 p-4 text-yellow-500 bg-black">
          <h1 className="font-bold ">Vehicles</h1>
          <Link>Motorbikes </Link>
          <br />
          <Link>Cars</Link>
          <br />
          <Link>Bicycles</Link>
        </div>
        <div className="rounded-lg border border-gray-300 p-4 text-yellow-500 bg-black">
          <h1 className="font-bold ">Business & Industry</h1>
          <Link>Marketing </Link>
          <br />
          <Link>Sales</Link>
          <br />
          <Link>Machinery</Link>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
