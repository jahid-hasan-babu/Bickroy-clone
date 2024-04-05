import React from "react";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/img/image.json";

const AddsSkeleton = () => {
  return (
    <div className="container lg:mx-auto lg:max-w-6xl">
      <div className="grid grid-cols-1 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => {
          return (
            <div className="text-center p-2" key={i}>
              <div className="rounded-lg border border-gray-300 p-4">
                <Lottie
                  className="w-[100%]"
                  animationData={ImagePlaceholder}
                  loop={true}
                />
                <div>
                  <Skeleton count={2} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddsSkeleton;
