import {combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ingredientsSlice, TIngredientsInternalActions } from './ingredients/ingredientsSlice';
import { authSlice, TAuthInternalActions } from './auth/auth-slice';
import { FeedSlice, TFeedWsInternalActions, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './feed/feed-slice';
import { feedWsConnect, feedWsDisconnect, TFeedWsExternalActions } from './feed/feed-actions';
import { socketMiddleware } from './middleware/socket-middleware';

export const rootReducer = combineReducers({
    [authSlice.reducerPath]: authSlice.reducer,
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [FeedSlice.reducerPath]: FeedSlice.reducer,
})

const feedMiddleware = socketMiddleware({
    connect: feedWsConnect,
    disconnect: feedWsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(feedMiddleware),
})

type TApplicationActions = TFeedWsInternalActions | TFeedWsExternalActions |
    TAuthInternalActions |
    TIngredientsInternalActions;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
