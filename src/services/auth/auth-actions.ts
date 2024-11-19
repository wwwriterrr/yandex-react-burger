import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsAuthChecked, setUser } from "./auth-slice";
import { api } from "./api";


export const checkUserAuth = createAsyncThunk(
    'auth/checkUserAuth',
    async (_, {dispatch}) => {
        if (localStorage.getItem("accessToken")) {
            api.getUser()
                .then(user => dispatch(setUser(user)))
                .finally(() => dispatch(setIsAuthChecked(true)))
        }else{
            dispatch(setIsAuthChecked(true));
        }
    }
)
