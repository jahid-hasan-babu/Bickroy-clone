import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddStore from "../../store/Adds";

const AddListByCategoryKeyword = () => {
  const { CategoryList, CategoryListRequest, SearchKeyword } = AddStore();

  useEffect(() => {
    CategoryListRequest();
  }, []);

  return (
    <div className="lg:w-1/3 mt-6 lg:mt-0">
      <div className="bg-black rounded-lg p-6 text-yellow-500">
        <h1 className="text-4xl font-bold text-center mb-4">Categories</h1>
        <ul className="w-full max-w-md">
          {CategoryList.map((item, index) => (
            <li key={`${item.categoryName}-${index}`}>
              <Link
                to={
                  SearchKeyword
                    ? `/by-keyword/${item.categoryName}/${SearchKeyword}`
                    : `/by-keyword/${item.categoryName}`
                }
                className="block rounded-lg border border-yellow-300 p-4 mb-2 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                {item.categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddListByCategoryKeyword;
