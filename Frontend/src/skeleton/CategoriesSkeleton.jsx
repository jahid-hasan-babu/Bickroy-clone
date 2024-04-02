import React from "react";
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/img/image.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoriesSkeleton = () => {
  return (
    <div className="flex flex-col items-center py-10 bg-slate-100">
      <h1 className="text-4xl font-bold text-center my-2 text-green-500">
        Top Categories
      </h1>
      <p className="md:text-lg sm:text-sm font-bold mb-5 text-center  text-green-500">
        Explore a World of Choices Across Our Most Popular <br />
        Shopping Categories
      </p>
      <div className="grid grid-cols-1 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 16 }).map((_, i) => {
          return (
            <div className="text-center p-2" key={i}>
              <div className="rounded-lg border border-gray-300 p-4">
                <div
                  className="flex items-center justify-between"
                  style={{ width: "200px", height: "100px" }}
                >
                  <Lottie
                    className="w-full h-full"
                    animationData={ImagePlaceholder}
                    loop={true}
                  />
                  <div className="p-5">
                    <Skeleton count={2} width={100} height={10} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
