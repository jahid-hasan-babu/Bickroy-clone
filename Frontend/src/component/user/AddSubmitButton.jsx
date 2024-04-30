import React from "react";
import CreateAddsStore from "../../store/CreateAddsStore";

const AddSubmitButton = (props) => {
  let { isFormSubmit } = CreateAddsStore();

  if (isFormSubmit === false) {
    return (
      <button onClick={props.onClick} type="submit" className={props.className}>
        {props.text}
      </button>
    );
  } else {
    return (
      <button
        disabled={true}
        className={
          "flex items-center w-full md:w-80% py-2 px-4 rounded-md font-bold text-lg border-none outline-none bg-yellow-500 text-black cursor-not-allowed"
        }
      >
        <div className="animate-spin mr-1 h-4 w-4 border-t-2 border-b-2 rounded-full border-black"></div>
        <span>Processing...</span>
      </button>
    );
  }
};

export default AddSubmitButton;
