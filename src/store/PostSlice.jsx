import { createSlice } from "@reduxjs/toolkit";
import pocketwatch from "../assets/images/pocketwatch.jpg";
import login from "../assets/images/login.jpg";
import whitecat from "../assets/images/whitecat.jpg";

const initialState = [
  {
    id: 1,
    image: login,
    likes: 20,
    comments: ["Great post!", "Interesting!"],
    caption: "Social media 3.0",
  },
  {
    id: 2,
    image: pocketwatch,
    likes: 35,
    comments: ["Looks awesome!", "Cool vibe!","Nothing can replace vintage vibe"],
    caption: "vintage vibes😎",
  },
  {
    id: 3,
    image: whitecat,
    likes: 45,
    comments: ["So cute!", "Lovely cat!"],
    caption: "kittens......🙂",
  },
];


const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload); 
    },
    updateLikes:(state,action)=>{
      const{id,increment}=action.payload
      const post=state.find((p)=>p.id === id)
      if(post){
        post.likes += increment ? 1 :-1
      }
    },
    updateComments:(state,action)=>{
      const {id,comment}=action.payload
      const post=state.find((c)=>c.id ===id)
      if(post){
        post.comments.push(comment)
        }
    },
    deleteComment:(state,action)=>{
     const { postId, commentIndex } = action.payload;
      const post = state.find((p) => p.id === postId);
      if (post) {
        post.comments.splice(commentIndex, 1)
      }
  },
}
})
export const { addPost,updateComments,updateLikes ,deleteComment} = PostSlice.actions;
export default PostSlice.reducer;
