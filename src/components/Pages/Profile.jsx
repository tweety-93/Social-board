import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditModel from "./EditModel";


function Profile() {
  const [model, setModel] = useState(false);
  const posts = useSelector((state) => state.post);
  const user = useSelector((state)=>state.profile)
  
  const modelHandler = () => {
    setModel(!model);
  }
  
return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full max-w-3xl bg-white border rounded-lg shadow-lg">
        <h2 className="p-4 text-xl font-semibold text-white bg-slate-800">
          Profile
        </h2>
        <div className="p-8 pb-4 border-b">
          <div className="flex flex-row items-center pb-6">
            <div className="mr-4">
              {user&& (
                <img
                  src={user.avatar}
                  alt={user.userName}
                  className="object-cover w-16 h-16 rounded-full"
                />
              )}
            </div>

            <div className="flex-1">
              {user && (
                <>
                  <div className="text-xl font-semibold">
                    {user.userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    @{user.name}
                  </div>

                  <div className="flex mt-2 space-x-6 text-gray-600">
                    <div>
                      <span className="font-bold">{user.followers}</span> Followers
                    </div>
                    <div>
                      <span className="font-bold">{posts.length}</span> Posts
                    </div>
                  </div>
                </>
              )}
            </div>
        
            <div>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={modelHandler}
              >
                Edit Profile
              </button>
            </div>
          </div>

        <div className="pt-4 text-center border-t">
            <h3 className="text-lg font-semibold">Bio</h3>
            <p className="text-black">
              {user.bio}
            </p>
          </div>
        </div>
      </div>

     <div className="w-full max-w-3xl mt-8">
        <h2 className="mb-4 text-xl font-semibold">My Posts</h2>
        <div className="grid grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="h-40 bg-gray-200">
              <img
                src={post.image}
                alt={post.caption}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <EditModel model={model} modelHandler={modelHandler} />
    </div>
  );
}
export default Profile;
