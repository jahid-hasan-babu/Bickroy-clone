import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddStore from "../store/Adds";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";

const AddByCategoryKeyword = () => {
  const { ListByCategoryKeywordRequest } = AddStore();
  const { Keyword } = useParams();
  useEffect(() => {
    (async () => {
      await ListByCategoryKeywordRequest(Keyword);
    })();
  }, [Keyword]);
  return (
    <div>
      <AppNavbar />
      <Footer />
    </div>
  );
};

export default AddByCategoryKeyword;
