import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TApiIngredient, TApiResponse } from "../../core/type";
import { apiUrl } from "../../core/constants";


type IngredientsState = {
    ingredients: TApiIngredient[],
    ingredientsLoading: boolean,
    ingredientsError: string | null,
};

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async (_, {rejectWithValue}) => {
        try{
            const response = await fetch(`${apiUrl}/ingredients`);

            if (!response.ok) {
                return response.json().then((text) => {
                    return rejectWithValue(text.reason || 'Error with fetch ingredients');
                });
            }

            const data: TApiResponse = await response.json();

            return data.data;
        }catch(err){
            return rejectWithValue((err as Error).message || err);
        }
    }
)

const initialState: IngredientsState = {
    ingredients: [],
    ingredientsLoading: false,
    ingredientsError: null,
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.ingredientsLoading = true;
                state.ingredientsError = null;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.ingredientsLoading = false;
                state.ingredients = action.payload;
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.ingredientsLoading = false;
                state.ingredientsError = typeof action.payload === 'string' ? action.payload : 'Error with fetch ingredients';
            })
    }
})

export default ingredientsSlice.reducer;
