import {createSlice} from "@reduxjs/toolkit"

const AuthSlice = createSlice({
    name: 'auth',
    initialState:{
        isAuthenticated: false,
        user: null,
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true
            state.user=action.payload
        },
        logout:(state)=>{
            state.isAuthenticated=false
            state.user=null
        },

    },
})

export const{login,logout}=AuthSlice.actions
export default AuthSlice.reducer