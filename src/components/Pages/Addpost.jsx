import React, { useState, useEffect } from "react";
import { addPost } from "../../store/PostSlice";
import { useDispatch,useSelector } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const AddPost = () => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleFileChange = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "djjmbb648",
          uploadPreset: "ktsclncj",
          sources: ["local", "url", "camera"],
          cropping: true,
          multiple: false,
          folder: "samples",
          clientAllowedFormats: ["png", "jpeg"],
          maxImageFileSize: 1000000,
          maxImageWidth: 1500,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setPublicId(result.info.public_id);
            setImageUrl(result.info.secure_url);
          } else if (error) {
            console.error("Image upload error: ", error);
          }
        }
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      image: imageUrl,
      likes: 0,
      comments: 0,
      caption,
      userName:posts.userName,
      profile:posts.profile,
       };
    dispatch(addPost(newPost));
    setCaption("");
    setImageUrl("");
    setPublicId("");
  };
  const cld = new Cloudinary({
    cloud: {
      cloudName: "djjmbb648",
    },
  });

  const img = publicId
    ? cld
        .image(publicId)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(500).height(500))
    : null;

  return (
    <div className="max-w-md p-6 mx-auto my-6 bg-white border-2 border-gray-300 rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="pb-2 mb-4 text-2xl font-semibold text-center text-white bg-gray-700 rounded-md">
          Create a Post
        </h2>
        <div className="mb-4">
          <label htmlFor="caption" className="block mb-2 font-medium text-gray-700">
            Caption
          </label>
          <textarea id="caption" value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"/>
        </div>
         <div className="mb-4">
          <label htmlFor="file-upload" className="block mb-2 font-medium text-gray-700">
            Upload File
          </label>
          <button type="button" onClick={handleFileChange}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Upload Image
          </button>
          {imageUrl && <AdvancedImage cldImg={img} />}
        </div>
        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Post
        </button>
      </form>
    </div>
  );
};
export default AddPost;
