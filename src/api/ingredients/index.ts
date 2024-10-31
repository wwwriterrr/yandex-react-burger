import { apiUrl } from "../../core/constants";
import { TApiResponse } from "../../core/type";


export const getIngredients = async () => {
    try{
        const response = await fetch(`${apiUrl}/ingredients`);

        if(!response.ok){
            return {status: 'error', error: `Error fetch ingredients. Status: ${response.status}`}
        }

        const data: TApiResponse = await response.json();

        if(!data.success){
            return {status: 'error', error: `Error fetch ingredients.`}
        }

        return {status: 'success', data: data.data}
    }catch (err){
        console.log('Igredients fetch error', (err as Error).message);
        return {status: 'error', error: `Error fetch ingredients. Status: ${(err as Error).message}`}
    }
}