import {combineSlices, configureStore} from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ingredientsSlice } from './ingredients/ingredientsSlice';
import { authSlice } from './auth/auth-slice';


export const rootReducer = combineSlices(
    ingredientsSlice,
    authSlice,
);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
