import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderItem, WebsocketStatus } from '../../core/type';

export type TFeedProfileStore = {
    status: WebsocketStatus,
    messages: TOrderItem[],
    connectionError: string | null,
}

export type TFeedProfileResponse = {
    success: boolean, 
    orders: TOrderItem[], 
    total: number, 
    totalToday: number
}

const initialState: TFeedProfileStore = {
    status: WebsocketStatus.OFFLINE,
    messages: [],
    connectionError: null,
}

export const FeedProfileSlice = createSlice({
    name: 'feedProfile',
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TFeedProfileResponse>) => {
            state.messages = action.payload.orders;
        }
    },
    selectors: {
        getFeedProfile: state => state.messages,
        getFeedProfileError: state => state.connectionError,
        getFeedProfileWsStatus: state => state.status,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = FeedProfileSlice.actions;

export const {getFeedProfile, getFeedProfileError, getFeedProfileWsStatus} = FeedProfileSlice.selectors;

export type TFeedProfileWsInternalActions = ReturnType<typeof FeedProfileSlice.actions[keyof typeof FeedProfileSlice.actions]>;
