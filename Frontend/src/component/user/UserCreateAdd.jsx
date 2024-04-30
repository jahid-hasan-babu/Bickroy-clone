import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateAddsStore from "../../store/CreateAddsStore";
import UserStore from "../../store/UserStore";
import { Toaster } from "react-hot-toast";
import AddSubmitButton from "../user/AddSubmitButton";
import { useNavigate } from "react-router-dom";

const CreateAddForm = () => {
  const navigate = useNavigate();
  const {
    addForm,
    addFormChange,
    saveAddRequest,
    addRequestById,
    updateAddRequest,
  } = CreateAddsStore();
  const {
    divisions,
    selectedDivision,
    districts,
    fetchDivisions,
    fetchDistricts,
    setSelectedDivision,
  } = UserStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [updateID, setUpdateID] = useState(null);

  useEffect(() => {
    (async () => {
      await fetchDivisions();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      setUpdateID(id);
      if (id !== null) {
        await fillForm(id);
      }
    })();
  }, []);

  const fillForm = async (id) => {
    try {
      let res = await addRequestById(id);

      // Check if the response is empty or null
      if (!res) {
        console.error("Error: Empty response received");
        return;
      }

      Object.keys(addForm).forEach((key) => {
        // Handle locationName
        if (key === "locationName") {
          setSelectedDivision(res[key]);
          fetchDistricts(res[key]);
        }
        // Handle subLocationName
        else if (key === "subLocationName") {
          addFormChange(key, res[key]);
        }
        // Handle condition and authenticity
        else if (key === "condition" || key === "authenticity") {
          addFormChange(key, res[key] || "");
        }
        // Handle image
        else if (key === "image" && res[key]) {
          addFormChange(key, res[key]);
          setImagePreview(res[key]);
        }
        // Handle other fields
        else {
          addFormChange(key, res[key] || "");
        }
      });
    } catch (error) {
      console.error("Error while filling form:", error);
    }
  };

  const handleDivisionChange = async (division) => {
    setSelectedDivision(division);
    addFormChange("locationName", division); // Update locationName in the form state
    await fetchDistricts(division); // Fetch districts based on the selected division
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const resetForm = () => {
    Object.keys(addForm).forEach((key) => {
      addFormChange(key, "");
    });
    setImagePreview(null);
  };

  // Inside the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = Object.keys(addForm);
    const emptyFields = requiredFields.filter((field) => !addForm[field]);

    if (emptyFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${emptyFields.join(", ")}`
      );
      return;
    }

    try {
      let res;
      if (updateID === null) {
        res = await saveAddRequest(addForm);
      } else {
        res = await updateAddRequest(updateID, addForm);
      }

      if (res.status === "success") {
        toast.success("Add Saved Successfully", {
          onClose: () => {
            resetForm();
            navigate("/my-account/my-adds");
          },
        });
      } else {
        toast.error("Failed to save add");
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
        setImagePreview(null);
        resolve();
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        addFormChange("image", imageData);
        setImagePreview(imageData);
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
            <select
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              placeholder="Location Name"
              className="input-field rounded-md p-1 mb-4 w-full"
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
            <select
              value={addForm.subLocationName}
              onChange={(e) => addFormChange("subLocationName", e.target.value)}
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
            <input
              value={addForm.categoryName}
              onChange={(e) => addFormChange("categoryName", e.target.value)}
              type="text"
              placeholder="Category Name"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            <input
              value={addForm.subcategoryName}
              onChange={(e) => addFormChange("subcategoryName", e.target.value)}
              type="text"
              placeholder="Subcategory Name"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            <input
              value={addForm.features}
              onChange={(e) => addFormChange("features", e.target.value)}
              type="text"
              placeholder="Features"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            <textarea
              value={addForm.description}
              onChange={(e) => addFormChange("description", e.target.value)}
              placeholder="Description"
              className="input-field rounded-md p-1 mb-4 w-full"
              rows="4"
            ></textarea>
            <input
              value={addForm.price}
              onChange={(e) => addFormChange("price", e.target.value)}
              type="text"
              placeholder="Price"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
            <input
              value={addForm.phone}
              onChange={(e) => addFormChange("phone", e.target.value)}
              type="text"
              placeholder="Phone"
              className="input-field rounded-md p-1 mb-4 w-full"
            />
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
