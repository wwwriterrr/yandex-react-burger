import { createSlice } from "@reduxjs/toolkit";
import type { TUserData } from "../../core/type";


type TAuthInitialState = {
    isAuth: boolean,
    isAuthChecked: boolean,
    user: TUserData | null,
    loading: boolean,
}

const initialState: TAuthInitialState = {
    isAuth: false,
    isAuthChecked: false,
    user: null,
    loading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    },
    selectors: {
        getIsAuth: state => state.isAuth,
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
