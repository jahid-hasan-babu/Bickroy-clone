import React from "react";
import notFound from "../../assets/img/error.png";

const NotFound = () => {
  return (
    <div>
      <img src={notFound} alt="Page not Found" className="w-full" />
    </div>
  );
};

export default NotFound;
