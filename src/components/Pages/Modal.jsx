import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComments, deleteComment } from "../../store/PostSlice";
import { FaTrash } from "react-icons/fa";

function EditModel({ model, modelHandler, postId }) {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.find((p) => p.id === postId));
  
  const handleAddComment = () => {
     dispatch(updateComments({ id: postId, comment: newComment }));
      setNewComment("");
   };
  const handleDeleteComment = (index) => {
    dispatch(deleteComment({ postId, commentIndex: index }));
  };

  return (
    <div>
      {model && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="mb-4">
              <h3 className="mb-2 text-xl font-semibold">
                Comments ({post ? post.comments.length : 0})
              </h3>
              <div className="overflow-y-auto max-h-40">
            {post ? (
                  post.comments.map((comment, index) => (
                    <div key={index}
                      className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-lg">
                      <span>{comment}</span>
                      <FaTrash
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteComment(index)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={handleAddComment}
                className="px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
              >
                Add
              </button>
              <button onClick={modelHandler}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default EditModel;
