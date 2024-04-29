import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateAddsStore from "../../store/CreateAddsStore";
import UserStore from "../../store/UserStore";
import { Toaster } from "react-hot-toast";
import AddSubmitButton from "../user/UserSubmitButton";
// import { useNavigate } from "react-router-dom";

const CreateAddForm = () => {
  const { addForm, addFormChange, saveAddRequest } = CreateAddsStore();
  let {
    divisions,
    selectedDivision,
    districts,
    fetchDivisions,
    fetchDistricts,
    setSelectedDivision,
  } = UserStore();
  const [imagePreview, setImagePreview] = useState(null);
  // const navigate = useNavigate();
  //for division and district call
  useEffect(() => {
    (async () => {
      await fetchDivisions();
    })();
  }, []);

  const handleDivisionChange = async (division) => {
    setSelectedDivision(division);
    fetchDistricts(division);
    addFormChange("locationName", division);
  };

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
    addFormChange("image", file);
  };

  // Function to reset form fields
  // Function to reset form fields
  const resetForm = () => {
    setSelectedDivision(""); // Reset selected division
    addFormChange("locationName", "");
    addFormChange("subLocationName", "");
    addFormChange("categoryName", "");
    addFormChange("subcategoryName", "");
    addFormChange("features", "");
    addFormChange("description", "");
    addFormChange("price", "");
    addFormChange("phone", "");
    addFormChange("userName", "");
    addFormChange("condition", "");
    addFormChange("authenticity", "");
    addFormChange("image", "");
    setImagePreview(null);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields = [
      "locationName",
      "subLocationName",
      "categoryName",
      "subcategoryName",
      "features",
      "description",
      "price",
      "phone",
      "userName",
      "condition",
      "authenticity",
      "image",
    ];
    const emptyFields = requiredFields.filter((field) => !addForm[field]);

    if (emptyFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${emptyFields.join(", ")}`
      );
      return;
    }

    try {
      // Call saveAddRequest and await the response
      const res = await saveAddRequest(addForm);

      // Check if the response status is successful
      if (res.status === "success") {
        toast.success("Add Created Successfully");
        resetForm(); // Reset form fields
        // navigate("/my-account/my-adds"); // Navigate to my-adds page
      } else {
        toast.error("Failed to create add");
      }
    } catch (error) {
      console.error("Error while saving add:", error);
      toast.error(
        "An error occurred while saving add. Please try again later."
      );
    }
  };

  const TransformFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        addFormChange("image", "");
        setImagePreview(null); // Clear image preview
        resolve();
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        addFormChange("image", imageData);
        setImagePreview(imageData); // Set image preview
        resolve();
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container mx-auto items-center my-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-black rounded-lg text-center shadow-md p-8">
          <h4 className="text-2xl text-yellow-500 font-bold mb-4">
            Create Add
          </h4>
          <form className="text-gray-500">
            {/* Render form fields */}
            {/* Location Name */}
            <select
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              placeholder="Location Name"
              className="input-field rounded-md p-1 mb-4 w-full "
            >
              <option key="default" value="">
                Select Division
              </option>
              {divisions.map((division) => (
                <option key={division._id} value={division.division}>
                  {division.division}
                </option>
              ))}
            </select>
            {/* Sublocation Name */}
            <select
              value={addForm.subLocationName}
              onChange={(e) => {
                addFormChange("subLocationName", e.target.value);
              }}
              placeholder="Sublocation Name"
              className="input-field rounded-md p-1 mb-4 w-full"
            >
              <option key="default" value="">
                Select District
              </option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {/* Category Name */}
            <input
              value={addForm.categoryName}
              onChange={(e) => addFormChange("categoryName", e.target.value)}
              type="text"
              placeholder="Category Name"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            {/* Subcategory Name */}
            <input
              value={addForm.subcategoryName}
              onChange={(e) => addFormChange("subcategoryName", e.target.value)}
              type="text"
              placeholder="Subcategory Name"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            {/* Features */}
            <input
              value={addForm.features}
              onChange={(e) => addFormChange("features", e.target.value)}
              type="text"
              placeholder="Features"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            {/* Description */}
            <textarea
              value={addForm.description}
              onChange={(e) => addFormChange("description", e.target.value)}
              placeholder="Description"
              className="input-field rounded-md p-1 mb-4 w-full"
              rows="4"
            ></textarea>
            {/* Price */}
            <input
              value={addForm.price}
              onChange={(e) => addFormChange("price", e.target.value)}
              type="text"
              placeholder="Price"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            {/* Phone */}
            <input
              value={addForm.phone}
              onChange={(e) => addFormChange("phone", e.target.value)}
              type="text"
              placeholder="Phone"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            {/* User Name */}
            <input
              value={addForm.userName}
              onChange={(e) => addFormChange("userName", e.target.value)}
              type="text"
              placeholder="User Name"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            <div className="mb-4 text-left text-yellow-500">
              <p className="text-lg mb-2">Condition</p>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="New"
                  checked={addForm.condition === "New"}
                  onChange={(e) => addFormChange("condition", e.target.value)}
                  className="mr-2"
                />
                New
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  value="Used"
                  checked={addForm.condition === "Used"}
                  onChange={(e) => addFormChange("condition", e.target.value)}
                  className="mr-2"
                />
                Used
              </label>
            </div>
            {/* Authenticity */}
            <div className="mb-4 text-left text-yellow-500">
              <p className="text-lg mb-2">Authenticity</p>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Original"
                  checked={addForm.authenticity === "Original"}
                  onChange={(e) =>
                    addFormChange("authenticity", e.target.value)
                  }
                  className="mr-2"
                />
                Original
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  value="Refurbished"
                  checked={addForm.authenticity === "Refurbished"}
                  onChange={(e) =>
                    addFormChange("authenticity", e.target.value)
                  }
                  className="mr-2"
                />
                Refurbished
              </label>
            </div>
            {/* Image upload */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="input-field rounded-md text-yellow-500 p-1 mb-4 w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="rounded-md mb-4"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
            <AddSubmitButton
              onClick={handleSubmit}
              submit={false}
              className="btn w-full md:w-80% font-bold text-lg border-none outline-none bg-yellow-500 text-black hover:text-white hover:bg-yellow-700 py-2 px-4 rounded-md"
              text="Save"
            />
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
      <Toaster position="bottom center" />
    </div>
  );
};

export default CreateAddForm;
