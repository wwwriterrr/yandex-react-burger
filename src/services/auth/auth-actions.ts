import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsAuthChecked, setUser } from "./auth-slice";
import { api } from './api';


export const checkUserAuth = createAsyncThunk(
    'auth/checkUserAuth',
    async (_, {dispatch}) => {
        if (localStorage.getItem("accessToken")) {
            try{
                const data = await api.getUser();

                dispatch(setUser(data.user));
            }catch(err){
                console.log(`Error with fetch user data: ${err}`);
            }

            dispatch(setIsAuthChecked(true));

            /* api.getUser()
                .then(data => dispatch(setUser(data.user)))
                .catch((err) => console.log(`Error with fetch user data: ${err}`))
                .finally(() => dispatch(setIsAuthChecked(true))) */
        }else{
            dispatch(setIsAuthChecked(true));
        }
    }
)

export const authLogin = createAsyncThunk(
    'auth/login',
    async ({email, password}: {email: string, password: string}, {rejectWithValue}) => {
        try{
            const data = await api.Login({email, password});

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            return data.user;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

export const authLogout = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try{
            await api.Logout();

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            return;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

export const authRegister = createAsyncThunk(
    'auth/register',
    async ({name, email, password}: {name: string, email: string, password: string}, {rejectWithValue}) => {
        try{
            const data = await api.Register({name, email, password});

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            return data.user;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

export const authProfile = createAsyncThunk(
    'auth/profile',
    async ({name, email, password}: {name: string, email: string, password: string}, {rejectWithValue}) => {
        try{
            const data = await api.SaveProfile({name, email, password});

            return data.user;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

export const authForgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({email}: {email: string}, {rejectWithValue}) => {
        try{
            await api.ForgotPassword({email});

            return;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

export const authResetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({password, token}: {password: string, token: string}, {rejectWithValue}) => {
        try{
            await api.ResetPassword({password, token});

            return;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
