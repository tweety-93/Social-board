import React from "react";
import avatar1 from "../../assets/Profile/avatar1.jpg";
import avatar3 from "../../assets/Profile/avatar3.jpg";
import avatar4 from "../../assets/Profile/avatar4.jpg";
import avatar2 from "../../assets/Profile/avatar2.jpg";
import music from "../../assets/Profile/music.jpg";
import {toggleFollow} from "../../store/ProfileSlice"
import { useDispatch, useSelector } from "react-redux";

const suggestions = [
  { id: 1, name: "John Doe", handle: "@johndoe", avatar: avatar1 },
  { id: 2, name: "Jane Smith", handle: "@janesmith", avatar: avatar2 },
  { id: 3, name: "Alice John", handle: "@alicejohnson", avatar: music },
  { id: 4, name: "Ervin Howell", handle: "Antonette", avatar: avatar3 },
  { id: 5, name: "Kamren", handle: "Chelsey Doe", avatar: avatar4 },
  
];

const Suggestions = () => {
  const following=useSelector((state)=>state.profile.isFollowing)
const dispatch=useDispatch()

const handleFollow=(person)=>{
  dispatch(toggleFollow(person.id))
}
  
  return (
    <div className="flex">
      <div className="fixed top-0 right-0 flex flex-col justify-between h-screen p-4 text-white bg-gray-800 w-72">
        <ul className="space-y-4">
          {suggestions.map((person) => (
            <li key={person.id} className="flex items-center space-x-4">
              <div>
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="object-cover w-10 h-10"
                />
              </div>
              <div>
                <p className="font-semibold">{person.name}</p>
                <p className="text-gray-500">{person.handle}</p>
              </div>
              <button
                className={`ml-auto px-4 py-1 rounded-full text-white ${
                  following.includes(person.id) ? "bg-gray-500" : "bg-blue-600"
                }`}
                onClick={() => handleFollow(person)}
              >
                {following.includes(person.id) ? "Unfollow" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Suggestions;
