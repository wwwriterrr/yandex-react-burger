import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TApiIngredient, TApiResponse } from "../../core/type";
import { apiUrl } from "../../core/constants";
import update from 'immutability-helper'


type IngredientsState = {
    ingredients: TApiIngredient[],
    ingredientsLoading: boolean,
    ingredientsError: string | null,
    constructor: TApiIngredient[],
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
    constructor: [],
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        removeConstructorItem: (state, action) => {
            const index = action.payload as number;

            if(index === 0 || index === state.constructor.length-1) return;

            state.constructor.splice(index, 1);
        },
        moveConstructorItem: (state, action) => {
            const dragIndex = action.payload.dragIndex;
            const hoverIndex = action.payload.hoverIndex;

            state.constructor = update(state.constructor, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, state.constructor[dragIndex] as TApiIngredient],
                ],
            })
        },
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

                const firstBun = action.payload.filter(item => item.type === 'bun')[0];
                const oneMain = action.payload.filter(item => item.type === 'main')[0];
                const oneSauce = action.payload.filter(item => item.type === 'sauce')[0];
                if(firstBun && oneMain && oneSauce) state.constructor = [firstBun, oneSauce, oneMain, firstBun];
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.ingredientsLoading = false;
                state.ingredientsError = typeof action.payload === 'string' ? action.payload : 'Error with fetch ingredients';
            })
    }
})

export default ingredientsSlice.reducer;

export const {removeConstructorItem, moveConstructorItem} = ingredientsSlice.actions;
