import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { CiHeart } from "react-icons/ci";
import { save } from "../../store/SaveSlice";
import {useDispatch} from "react-redux"

function Feed() {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("All");
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)


  const dispatch=useDispatch()

  const saveHandler=(photo)=>{
    dispatch(save(photo))
  }

  const fetchData = async () => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=41502049-3794362dee821f00a2bf85411&q=${searchTerm}&image_type=photo&pretty=true&page=${page}`
  );
  const newPhotos = response.data.hits;
  setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  setPage((prevPage) => prevPage + 1);
};
  
 useEffect(() => {
    fetchData();
    setHasMore(true)
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPhotos([])
    fetchData()
    setPage(1)
    setSearchTerm("")
  }

  return (
    <div className="flex-1 p-6">
      <form className="flex justify-center mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          name="searchInput"
          placeholder="Search for photos..."
          className="w-1/2 px-4 py-2 text-gray-700 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </form>

      <InfiniteScroll
        dataLength={photos.length}
        next={fetchData}
        hasMore={hasMore}
      />

      <div className="mx-8 ml-64">
        <div className="grid grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <div key={`${photo.id}-${index}`} className="relative group">
              <img
                src={photo.largeImageURL}
                alt={photo.user}
                className="object-cover w-full h-64 transition-transform duration-300 transform hover:scale-110"
              />

              <div className="absolute z-10 transition-transform duration-300 transform shadow-lg cursor-pointer top-2 left-2 group-hover:scale-125">
                <CiHeart  className="text-2xl" onClick={()=>saveHandler(photo)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Feed;
