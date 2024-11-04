import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TApiIngredient, TApiResponse } from "../../core/type";
import { apiUrl } from "../../core/constants";
import update from 'immutability-helper'
import { RootState } from "../store";


type IngredientsState = {
    ingredients: TApiIngredient[],
    ingredientsLoading: boolean,
    ingredientsError: string | null,
    constructor: TApiIngredient[],
    activeIngredient: TApiIngredient | null,
    orderLoading: boolean,
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

export type TOrderResponse = {
    success: boolean,
    name: string,
    order: {
        number: number,
    }
}

export const createOrder = createAsyncThunk(
    'ingredients/createOrder',
    async (_, {rejectWithValue, getState}) => {
        const constructor = (getState() as RootState).ingredients.constructor;
        const ingredients = constructor.reduce((acc: string[], row) => {
            return [...acc, row._id];
        }, [])

        try{
            const response = await fetch(`${apiUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients}),
            });

            if (!response.ok) {
                return response.json().then((text) => {
                    return rejectWithValue(text.reason || 'Error with fetch create order');
                });
            }

            const data: TOrderResponse = await response.json();

            if(!data.success){
                return rejectWithValue('Error with create order');
            }

            return data;
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
    activeIngredient: null,
    orderLoading: false,
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
        replaceConstructorBun: (state, action: PayloadAction<{pos: 'top' | 'bottom', ingredientId: string}>) => {
            const pos = action.payload.pos;
            const ingredient = state.ingredients.find(item => item._id === action.payload.ingredientId);

            if(!ingredient) return;

            if(pos === 'top'){
                state.constructor[0] = ingredient;
            }else{
                state.constructor[state.constructor.length-1] = ingredient;
            }
        },
        addToConstructor: (state, action: PayloadAction<{ingredientId: string}>) => {
            const ingredient = state.ingredients.find(item => item._id === action.payload.ingredientId);

            if(!ingredient) return;

            state.constructor.splice((state.constructor.length-1), 0, ingredient);
        },
        setActiveIngredient: (state, action: PayloadAction<{ingredient: TApiIngredient}>) => {
            state.activeIngredient = action.payload.ingredient;
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

                if(!firstBun || !oneMain || !oneSauce) return;

                state.constructor = [firstBun, oneMain, oneSauce, firstBun];
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.ingredientsLoading = false;
                state.ingredientsError = typeof action.payload === 'string' ? action.payload : 'Error with fetch ingredients';
            })
            // Create order
            .addCase(createOrder.pending, (state) => {
                state.orderLoading = true;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.orderLoading = false;

                if(!state.ingredients.length) return;

                const firstBun = state.ingredients.filter(item => item.type === 'bun')[0];
                const oneMain = state.ingredients.filter(item => item.type === 'main')[0];
                const oneSauce = state.ingredients.filter(item => item.type === 'sauce')[0];

                if(!firstBun || !oneMain || !oneSauce) return;

                state.constructor = [firstBun, oneMain, oneSauce, firstBun];
            })
            .addCase(createOrder.rejected, (state) => {
                state.orderLoading = false;
            })
    }
})

export default ingredientsSlice.reducer;

export const {removeConstructorItem, moveConstructorItem, replaceConstructorBun, addToConstructor, setActiveIngredient} = ingredientsSlice.actions;
