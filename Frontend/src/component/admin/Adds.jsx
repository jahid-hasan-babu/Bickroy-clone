import React, { useEffect } from "react";
import AdminSkeleton from "./../../skeleton/AdminSkeleton";
import AdminStore from "../../store/AdminStore";

const Adds = () => {
  const { addList, userList, totalAddRequest, totalUserRequest } = AdminStore();

  useEffect(() => {
    totalAddRequest();
    totalUserRequest();
  }, []);

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="flex justify-start gap-10">
        <div className="w-[200px] h-[100px] bg-yellow-500 text-center items-center rounded-xl">
          <div className="p-5">
            <h2 className="text-xl font-bold">
              Total Adds: {addList ? addList.length : 0}
            </h2>
          </div>
        </div>
        <div className="w-[200px] h-[100px] bg-yellow-500 text-center items-center rounded-xl">
          <div className="p-5">
            <h2 className="text-xl font-bold">
              Total User: {userList ? userList.length : 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adds;
