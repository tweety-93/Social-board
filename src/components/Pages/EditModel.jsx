import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/ProfileSlice";

function EditModel({ model, modelHandler }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (avatar) {
      console.log("Avatar file to be uploaded:", avatar);
     }
    const updateChanges = { name, userName, bio, avatar:imagePreview };
    dispatch(updateProfile(updateChanges));
    modelHandler();
  };

  return (
    <div>
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h3 className="mb-4 text-xl font-semibold">Edit Profile</h3>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="object-cover w-16 h-16 rounded-full"
                  />
                ) }
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">
                Username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={modelHandler}
                className="px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditModel;
