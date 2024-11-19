import { string } from "prop-types";
import { apiUrl } from "../../core/constants";
import { TLoginData } from "../../core/type";
import { checkResponse } from "../../core/utils";


const getUser = async () => {
    try{
        const response = await fetch(`${apiUrl}/auth/user`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `${localStorage.getItem('accessToken')}`,
            }
        });

        checkResponse(response);

        const data: TLoginData = await response.json();

        return data;
    }catch (err){
        return Promise.reject((err as Error).message || 'Get user error');
    }
}

const Login = async ({email, password}: {email: string, password: string}) => {
    if(!email || !password){
        return Promise.reject('Email and password is required');
    }

    try{
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        checkResponse(response);

        const data: TLoginData = await response.json();

        return data;
    }catch (err){
        return Promise.reject((err as Error).message || 'Login error');
    }
}

const Logout = async () => {
    try{
        const response = await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `${localStorage.getItem('refreshToken')}`,
            }
        });

        checkResponse(response);

        return;
    }catch (err){
        return Promise.reject((err as Error).message || 'Logout error');
    }
}

const Register = async ({name, email, password}: {name: string, email: string, password: string}) => {
    if(!name || !email || !password){
        return Promise.reject('All fields is required');
    }

    try{
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });

        checkResponse(response);

        const data: TLoginData = await response.json();

        return data;
    }catch (err){
        return Promise.reject((err as Error).message || 'Register error');
    }
}

const SaveProfile = async ({name, email, password}: {name: string, email: string, password: string}) => {
    if(!name || !email || !password){
        return Promise.reject('All fields is required');
    }

    try{
        const response = await fetch(`${apiUrl}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({name, email, password})
        });

        checkResponse(response);

        const data: TLoginData = await response.json();

        return data;
    }catch(err){
        return Promise.reject((err as Error).message || 'Get user error');
    }
}

const ForgotPassword = async ({email}: {email: string}) => {
    try{
        const response = await fetch(`${apiUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({email})
        });

        checkResponse(response);

        return;
    }catch (err){
        return Promise.reject((err as Error).message || 'Forgot password error');
    }
}

const ResetPassword = async ({password, token}: {password: string, token: string}) => {
    try{
        const response = await fetch(`${apiUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({password, token})
        });

        checkResponse(response);

        return;
    }catch (err){
        return Promise.reject((err as Error).message || 'Reset password error');
    }
}

export const api = {
    getUser,
    Login,
    Logout,
    Register,
    SaveProfile,
    ForgotPassword,
    ResetPassword,
}
