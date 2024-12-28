import {combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ingredientsSlice, TIngredientsInternalActions } from './ingredients/ingredientsSlice';
import { authSlice, TAuthInternalActions } from './auth/auth-slice';
import { FeedSlice, TFeedWsInternalActions, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './feed/feed-slice';
import { 
    wsOpen as wsProfileOpen,
    wsClose as wsProfileClose,
    wsConnecting as wsProfileConnecting,
    wsError as wsProfileError,
    wsMessage as wsProfileMessage,
} from './feed-profile/feed-profile-slice';
import { feedWsConnect, feedWsDisconnect, TFeedWsExternalActions } from './feed/feed-actions';
import { socketMiddleware } from './middleware/socket-middleware';
import { FeedProfileSlice, TFeedProfileWsInternalActions } from './feed-profile/feed-profile-slice';
import { feedProfileWsConnect, feedProfileWsDisconnect, TFeedProfileWsExternalActions } from './feed-profile/feed-profile-actions';

export const rootReducer = combineReducers({
    [authSlice.reducerPath]: authSlice.reducer,
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [FeedSlice.reducerPath]: FeedSlice.reducer,
    [FeedProfileSlice.reducerPath]: FeedProfileSlice.reducer,
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

const feedProfileMiddleware = socketMiddleware({
    connect: feedProfileWsConnect,
    disconnect: feedProfileWsDisconnect,
    onConnecting: wsProfileConnecting,
    onOpen: wsProfileOpen,
    onClose: wsProfileClose,
    onError: wsProfileError,
    onMessage: wsProfileMessage,
}, true)

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(feedMiddleware).concat(feedProfileMiddleware),
})

type TApplicationActions = TFeedWsInternalActions | TFeedWsExternalActions |
    TFeedProfileWsInternalActions | TFeedProfileWsExternalActions |
    TAuthInternalActions |
    TIngredientsInternalActions;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
