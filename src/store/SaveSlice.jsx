import {createSlice} from "@reduxjs/toolkit"

const saveSlice = createSlice({
  name: "save",
  initialState: {
    items: [],
  },
  reducers: {
    save: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
     },
  },
});
export const {save,remove}=saveSlice.actions
export default saveSlice.reducer