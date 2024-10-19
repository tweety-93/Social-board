import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./AuthSlice"
import postReducer from "./PostSlice"
import saveReducer from "./SaveSlice"
import profileReducer from "./ProfileSlice"

const store=configureStore({
    reducer:{
        auth:authReducer,
        post:postReducer,
        save:saveReducer,
        profile:profileReducer,
    }
})
export default store