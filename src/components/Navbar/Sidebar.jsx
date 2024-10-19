import React from "react";
import { IoHomeOutline,IoLogOut } from "react-icons/io5";
import { CgProfile} from "react-icons/cg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import { GrGallery } from "react-icons/gr";
import {CiSaveDown1} from "react-icons/ci"
import {logout} from "../../store/AuthSlice"
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const username=useSelector((state)=>state.auth.user)
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const logoutHandler=()=>{
    dispatch(logout())
    navigate("/")
   }
  
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 flex flex-col justify-between w-64 h-screen p-4 text-white bg-gray-800">
        <div>
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-pink-500">
              Snapgram
            </h1>
          </div>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/homepage"
                  className="flex items-center p-2 space-x-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white"
                >
                  <IoHomeOutline className="w-6 h-6" />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="flex items-center p-2 space-x-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white"
                >
                  <CgProfile className="w-6 h-6" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/addpost"
                  className="flex items-center p-2 space-x-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white"
                >
                  <MdOutlineAddAPhoto className="w-6 h-6" />
                  <span>Add Post</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/feed"
                  className="flex items-center p-2 space-x-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white"
                >
                  <GrGallery className="w-6 h-6" />
                  <span>Explore</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/save"
                  className="flex items-center p-2 space-x-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white"
                >
                  <CiSaveDown1 className="w-6 h-6" />
                  <span>Save</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center p-2 space-x-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white"
            onClick={logoutHandler}
          >
            <IoLogOut className="w-6 h-6" />
            <span>Logout</span>
          </button>
          
          <h2>Welcome, {username?.displayName || username?.email ||"Guest"}</h2>
        </div>
      </div>
    </div>
  );}
export default Sidebar;