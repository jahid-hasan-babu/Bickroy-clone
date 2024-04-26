import React, { useEffect } from "react";
import AddStore from "../../store/Adds";
import CategoriesSkeleton from "../../skeleton/CategoriesSkeleton";

const Categories = () => {
  const { CategoryList, CategoryListRequest } = AddStore();
  useEffect(() => {
    CategoryListRequest();
  }, []);

  if (!CategoryList || CategoryList.length === 0) {
    return <CategoriesSkeleton />;
  }
  return (
    <div className="flex flex-col items-center py-10 bg-black">
      <h1 className="text-4xl font-bold text-center my-2 text-yellow-500">
        Top Categories
      </h1>
      <p className="md:text-lg sm:text-sm font-bold mb-5 text-center  text-yellow-500">
        Explore a World of Choices Across Our Most Popular <br />
        Shopping Categories
      </p>
      <div className="grid grid-cols-1 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CategoryList.map((item, i) => {
          return (
            <div className="text-center p-2" key={i}>
              <div className="rounded-lg border border-yellow-300 p-4">
                <div
                  className="flex items-center justify-between"
                  style={{ width: "200px", height: "100px" }}
                >
                  <img className="w-full h-full" src={item.image} alt="image" />
                  <div className="p-5 text-yellow-500">
                    <p>{item.categoryName}</p>
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

export default Categories;
