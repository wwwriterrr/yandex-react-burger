import { apiUrl } from "../../core/constants";
import { checkResponse } from "../../core/utils";


const getUser = async () => {
    try{
        const response = await fetch(`${apiUrl}/auth/user`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        });

        checkResponse(response);

        const data = response.json();

        return data;
    }catch (err){
        return Promise.reject((err as Error).message || 'Get user error');
    }
}

export const api = {
    getUser,
}
