import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="container w-[80%] mx-auto">
      <div>
        <div className="p-5">
          <Skeleton count={14} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
