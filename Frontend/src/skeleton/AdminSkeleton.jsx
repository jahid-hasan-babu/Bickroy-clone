import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminSkeleton = () => {
  return (
    <div className="container lg:mx-auto lg:max-w-6xl">
      <div>
        <div className="p-11 mx-auto">
          <Skeleton className="h-[40px]" count={14} />
        </div>
      </div>
    </div>
  );
};

export default AdminSkeleton;
