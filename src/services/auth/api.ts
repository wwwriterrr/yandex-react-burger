import { apiUrl } from "../../core/constants";
import { TLoginData } from "../../core/type";
import { checkResponse } from "../../core/utils";


const RefreshToken = async (token: string) => {
    try{
        const response = await fetch(`${apiUrl}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `${localStorage.getItem('refreshToken')}`,
            },
            body: JSON.stringify({token})
        });

        if(!response.ok) return '';

        const data: {success: boolean, accessToken: string, refreshToken: string} = await response.json();

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        return data.accessToken;
    }catch (err){
        return '';
    }
}

const AppFetch = async (url: string | URL | globalThis.Request, options?: RequestInit) => {
    try{
        let response = await fetch(url, options);

        if(!response.ok && response.status === 401){
            // Refresh token and repeat fetch

            const refreshToken = localStorage.getItem('refreshToken');

            if(!refreshToken) return response;

            const newAccessToken: string = await RefreshToken(refreshToken);

            if(!newAccessToken) return response;

            const newOptions = {...options, headers: {...options?.headers, 'Authorization': newAccessToken}};

            response = await fetch(url, newOptions);

            return response;
        }

        return response;
    }catch (err) {
        return Promise.reject((err as Error).message || 'App fetch error');
    }
}

const getUser = async () => {
    try{
        // const response = await fetch(`${apiUrl}/auth/user`, {
        const response = await AppFetch(`${apiUrl}/auth/user`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `${localStorage.getItem('accessToken')}`,
            }
        });

        await checkResponse(response);

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
        const response = await AppFetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        await checkResponse(response);

        const data: TLoginData = await response.json();

        return data;
    }catch (err){
        return Promise.reject((err as Error).message || 'Login error');
    }
}

const Logout = async () => {
    try{
        const response = await AppFetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({token: localStorage.getItem('refreshToken')})
        });

        await checkResponse(response);

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
        const response = await AppFetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });

        await checkResponse(response);

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
        const response = await AppFetch(`${apiUrl}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({name, email, password})
        });

        await checkResponse(response);

        const data: TLoginData = await response.json();

        return data;
    }catch(err){
        return Promise.reject((err as Error).message || 'Get user error');
    }
}

const ForgotPassword = async ({email}: {email: string}) => {
    try{
        const response = await AppFetch(`${apiUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({email})
        });

        await checkResponse(response);

        return;
    }catch (err){
        return Promise.reject((err as Error).message || 'Forgot password error');
    }
}

const ResetPassword = async ({password, token}: {password: string, token: string}) => {
    try{
        const response = await AppFetch(`${apiUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({password, token})
        });

        await checkResponse(response);

        return;
    }catch (err){
        return Promise.reject((err as Error).message || 'Reset password error');
    }
}

export const api = {
    RefreshToken,
    getUser,
    Login,
    Logout,
    Register,
    SaveProfile,
    ForgotPassword,
    ResetPassword,
}
