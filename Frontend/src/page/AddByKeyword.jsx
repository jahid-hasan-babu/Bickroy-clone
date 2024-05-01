import React, { useEffect } from "react";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";
import AddListByKeyword from "./../component/adds/AddListByKeyword";
import { useParams } from "react-router-dom";
import AddStore from "../store/Adds";
import SearchInput from "../component/layout/SearchInput";

const AddByKeyword = () => {
  const { ListByKeywordRequest } = AddStore();
  const { Keyword } = useParams();
  useEffect(() => {
    (async () => {
      await ListByKeywordRequest(Keyword);
    })();
  }, [Keyword]);
  return (
    <div>
      <AppNavbar />
      <SearchInput />
      <AddListByKeyword />
      <Footer />
    </div>
  );
};

export default AddByKeyword;
