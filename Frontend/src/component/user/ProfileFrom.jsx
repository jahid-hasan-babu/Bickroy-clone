import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ProfileSkeleton from "./../../skeleton/ProfileSkeleton";
import UserSubmitButton from "./UserSubmitButton";
import UserStore from "../../store/UserStore";

const ProfileForm = () => {
  // Corrected to use Cookies.get

  let {
    ProfileDetails,
    ProfileForm,
    ProfileFormChange,
    ProfileDetailsRequest,
    ProfileSaveRequest,
  } = UserStore();

  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest(); // No need to pass userID here
    })();
  }, []); // Removed userID from the dependency array

  const Save = async () => {
    let res = await ProfileSaveRequest(ProfileForm);
    if (res) {
      toast.success("Profile Updated");
      await ProfileDetailsRequest(); // No need to pass userID here
    }
  };

  if (ProfileDetails === null) {
    return <ProfileSkeleton />;
  } else if (Array.isArray(ProfileDetails) && ProfileDetails.length === 0) {
    return <div>No profile details found.</div>;
  } else {
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
              <h4 className="text-2xl text-yellow-500 font-bold mt-8">
                Shipping Details :
              </h4>
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
              </div>
              <div className="flex justify-end mt-8">
                <UserSubmitButton
                  onClick={Save}
                  className="btn bg-yellow-500 text-black hover:text-white hover:bg-yellow-700"
                  text="Save"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
