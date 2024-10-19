import { createSlice } from "@reduxjs/toolkit";
import bluegirl from "../assets/Profile/bluegirl.jpg";

const initialState = {
  name: "Crystel Lee",
  userName: "crystel",
  bio: "Enthusiast Web Developer | Love building cool projects | React Developer",
  avatar: bluegirl,
  followers: 100,
  isFollowing: [], 
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { name, userName, bio, avatar } = action.payload;
      state.name = name || state.name;
      state.userName = userName || state.userName;
      state.bio = bio || state.bio;
      state.avatar = avatar || state.avatar;
    },

    // Combine follow and unfollow logic in one reducer
    toggleFollow: (state, action) => {
      const userFollow = action.payload;
      const isAlreadyFollowing = state.isFollowing.includes(userFollow);

      if (isAlreadyFollowing) {
      
        state.isFollowing = state.isFollowing.filter(
          (user) => user !== userFollow
        );
        state.followers -= 1;
      } else {
        state.isFollowing.push(userFollow);
        state.followers += 1;
      }
    },
  },
});

export const { updateProfile, toggleFollow } = profileSlice.actions;
export default profileSlice.reducer;
