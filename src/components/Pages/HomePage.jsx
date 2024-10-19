import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegComment, FaHeart } from "react-icons/fa";
import { updateLikes } from "../../store/PostSlice";
import Suggestions from "../Navbar/Suggestions";
import Modal from "./Modal";

function HomePage() {
  const [modal, setModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const posts = useSelector((state) => state.post);
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const likeHandler = (id, increment = true) => {
    dispatch(updateLikes({ id, increment }));
  };

  const modalHandler = (id) => {
    setSelectedPostId(id);
    setModal(!modal);
  };
  
return (
    <div className="flex flex-col items-center space-y-12">
      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-xl mt-8 overflow-hidden bg-gray-100 rounded-lg shadow-xl"
        >
          <div className="flex items-center p-4">
            <div className="w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
              <img
                src={user.avatar}
                alt="avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <span className="ml-4">
              <p className="text-xl font-semibold text-black">{user.name}</p>
            </span>
          </div>

          <img
            src={post.image}
            alt="Post"
            className="object-cover w-full h-full"
          />
          <p className="p-4 font-semibold text-black text-m">{post.caption}</p>

          <div className="flex items-center justify-between gap-2 p-4">
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <FaHeart
                  className="text-3xl text-red-600 cursor-pointer"
                  onClick={() => likeHandler(post.id, true)}
                />
                <p className="text-lg font-semibold">{post.likes}</p>
              </div>

              <div className="flex items-center space-x-2">
                <FaRegComment
                  className="text-3xl cursor-pointer"
                  onClick={() => modalHandler(post.id)}
                />
                <p className="text-lg font-semibold">{post.comments.length}</p>
              </div>
             </div>
          </div>
        </div>
      ))}
      <div>
        <Suggestions />
      </div>
      {modal && (
        <Modal
          model={modal}
          modelHandler={modalHandler}
          postId={selectedPostId}
        />
      )}
     </div>
  );
}
export default HomePage;
