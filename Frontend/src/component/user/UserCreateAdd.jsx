import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import UserSubmitButton from "./UserSubmitButton";
import CreateAddsStore from "../../store/CreateAddsStore";

const CreateAddForm = () => {
  const { addForm, addFormChange, saveAddRequest } = CreateAddsStore();
  const [imagePreview, setImagePreview] = useState(null);

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
    addFormChange("image", file);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await saveAddRequest(addForm);
    if (res.status === "success") {
      toast.success("Add Created Successfully");
    } else {
      toast.error("Failed to create add");
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
    <div className="container mx-auto my-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-black rounded-lg shadow-md p-8">
          <h4 className="text-2xl text-yellow-500 font-bold mb-4">
            Create Add
          </h4>
          <form onSubmit={handleSubmit}>
            {/* Render form fields */}
            {/* Location Name */}
            <input
              value={addForm.locationName}
              onChange={(e) => addFormChange("locationName", e.target.value)}
              type="text"
              placeholder="Location Name"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* Sublocation Name */}
            <input
              value={addForm.subLocationName}
              onChange={(e) => addFormChange("subLocationName", e.target.value)}
              type="text"
              placeholder="Sublocation Name"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* Category Name */}
            <input
              value={addForm.categoryName}
              onChange={(e) => addFormChange("categoryName", e.target.value)}
              type="text"
              placeholder="Category Name"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* Subcategory Name */}
            <input
              value={addForm.subcategoryName}
              onChange={(e) => addFormChange("subcategoryName", e.target.value)}
              type="text"
              placeholder="Subcategory Name"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* Features */}
            <input
              value={addForm.features}
              onChange={(e) => addFormChange("features", e.target.value)}
              type="text"
              placeholder="Features"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* Description */}
            <textarea
              value={addForm.description}
              onChange={(e) => addFormChange("description", e.target.value)}
              placeholder="Description"
              className="input-field rounded-md p-1 mb-4"
              rows="4"
            ></textarea>
            {/* Price */}
            <input
              value={addForm.price}
              onChange={(e) => addFormChange("price", e.target.value)}
              type="text"
              placeholder="Price"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* Phone */}
            <input
              value={addForm.phone}
              onChange={(e) => addFormChange("phone", e.target.value)}
              type="text"
              placeholder="Phone"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* User Name */}
            <input
              value={addForm.userName}
              onChange={(e) => addFormChange("userName", e.target.value)}
              type="text"
              placeholder="User Name"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* User Name */}
            <input
              value={addForm.condition}
              onChange={(e) => addFormChange("condition", e.target.value)}
              type="text"
              placeholder="Condition"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* User Name */}
            <input
              value={addForm.authenticity}
              onChange={(e) => addFormChange("authenticity", e.target.value)}
              type="text"
              placeholder="Authenticity"
              className="input-field rounded-md p-1 mb-4"
            />
            {/* Image upload */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="input-field rounded-md p-1 mb-4"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="rounded-md mb-4"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
            {/* Submit button */}
            <div className="flex justify-end mt-8">
              <UserSubmitButton
                className="btn bg-yellow-500 text-black hover:text-white hover:bg-yellow-700"
                text="Save"
              />
            </div>
          </form>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default CreateAddForm;
