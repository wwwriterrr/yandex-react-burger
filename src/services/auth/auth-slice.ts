import { createSlice } from "@reduxjs/toolkit";
import type { TUserData } from "../../core/type";


type TAuthInitialState = {
    isAuthChecked: boolean,
    user: TUserData | null,
    loading: boolean,
}

const initialState: TAuthInitialState = {
    isAuthChecked: false,
    user: null,
    loading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    selectors: {
        getIsAuthChecked: state => state.isAuthChecked,
        getUser: state => state.user,
    },
    extraReducers: (builder) => {
        // builder
            
    }
})

export default authSlice.reducer;

// export const {} = authSlice.actions;

export const {getIsAuthChecked, getUser} = authSlice.selectors;

export const {setIsAuthChecked, setUser} = authSlice.actions;
