import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth", 
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

// createSlice is a Redux Toolkit helper that bundles the state, reducers and the action creators in one place.
// initial State is what the app knows when it first loads, or after a refresh.
// name: "auth" is a prefix for the action types, so actions become "auth/login"
// reducers holds the only functions allowed to change this state.
// state is the current auth state. action is the message carrying data.
// action.payload is whatever passed into login(...), so .userData reads the userData key from it.
// authSlice.reducer is the engine that processes those actions. It goes into configureStore in store file.