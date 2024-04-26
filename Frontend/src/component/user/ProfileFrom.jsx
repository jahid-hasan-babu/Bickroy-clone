import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import UserSubmitButton from "./UserSubmitButton";
import UserStore from "../../store/UserStore";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  let {
    ProfileForm,
    ProfileFormChange,
    ProfileDetailsRequest,
    ProfileSaveRequest,
    ProfileDeleteRequest,
    ProfileLogoutRequest,
  } = UserStore();

  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest();
    })();
  }, []);

  const Save = async () => {
    let res = await ProfileSaveRequest(ProfileForm);
    if (res) {
      toast.success("Profile Updated");
      await ProfileDetailsRequest();
    }
  };
  const handleDelete = async () => {
    const success = await ProfileDeleteRequest();
    if (success) {
      toast.success("Profile Deleted");
      resetForm();
    } else {
      toast.error("Failed to delete profile");
    }
  };

  const resetForm = () => {
    ProfileFormChange("name", "");
    ProfileFormChange("locationName", "");
    ProfileFormChange("subLocationName", "");
    ProfileFormChange("phone", "");
  };
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await ProfileLogoutRequest();
      localStorage.clear();
      sessionStorage.clear();
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout. Please try again later.");
    }
  };

  return (
    <div className="container w-[80%] mx-auto my-11 px-4 py-8 md:py-16">
      <div className="flex items-center justify-center">
        <div className="w-full md:w-1/2">
          <div className="bg-black rounded-lg shadow-md px-6 py-8 md:py-11">
            <h4 className="text-2xl text-yellow-500 font-bold mb-4">
              User Details
            </h4>
            <hr className="border-yellow-500 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-2">
                <label className="text-yellow-500">Name</label>
                <input
                  value={ProfileForm.name}
                  onChange={(e) => {
                    ProfileFormChange("name", e.target.value);
                  }}
                  type="text"
                  className="input-field rounded-md p-1"
                />
              </div>
              <div className="p-2">
                <label className="text-yellow-500 mr-5 pb-2">
                  Location Name :
                </label>
                <input
                  value={ProfileForm.locationName}
                  onChange={(e) => {
                    ProfileFormChange("locationName", e.target.value);
                  }}
                  type="text"
                  className="input-field rounded-md p-1"
                />
              </div>
            </div>

            <hr className="border-yellow-500 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-2">
                <label className="text-yellow-500">Sublocation Name :</label>
                <input
                  value={ProfileForm.subLocationName}
                  onChange={(e) => {
                    ProfileFormChange("subLocationName", e.target.value);
                  }}
                  type="text"
                  className="input-field rounded-md p-1"
                />
              </div>
              <div className="p-2">
                <label className="text-yellow-500">Phone:</label>
                <input
                  value={ProfileForm.phone}
                  onChange={(e) => {
                    ProfileFormChange("phone", e.target.value);
                  }}
                  type="text"
                  className="input-field rounded-md p-1"
                />
              </div>
            </div>
            <div className="flex justify-end  mt-8">
              <UserSubmitButton
                onClick={Save}
                className="btn bg-yellow-500 text-black hover:text-white hover:bg-yellow-700"
                text="Save"
              />
            </div>

            <div className="flex justify-end  mt-8">
              <button
                onClick={handleDelete}
                className="btn ml-5 bg-red-500 text-black hover:bg-red-700 hover:bg-red"
              >
                Delete
              </button>
              <button
                onClick={onLogout}
                className="btn ml-5 bg-yellow-500 text-black hover:bg-yellow-700 hover:bg-red"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default ProfileForm;
