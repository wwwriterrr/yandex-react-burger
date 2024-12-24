import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type TOrderItem, WebsocketStatus } from '../../core/type';


export type TFeedStore = {
    status: WebsocketStatus,
    messages: TOrderItem[],
    total: number,
    totalToday: number,
    connectionError: string | null,
}

type TFeedResponse = {
    success: boolean, 
    orders: TOrderItem[], 
    total: number, 
    totalToday: number
}

const initialState: TFeedStore = {
    status: WebsocketStatus.OFFLINE,
    messages: [],
    total: 0,
    totalToday: 0,
    connectionError: null,
}

export const FeedSlice = createSlice({
    name: 'feed',
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
        wsMessage: (state, action: PayloadAction<TFeedResponse>) => {
            state.messages = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    },
    selectors: {
        getFeed: state => state.messages,
        getFeedError: state => state.connectionError,
        getFeedWsStatus: state => state.status,
        getFeedTotal: state => state.total,
        getFeedTotalToday: state => state.totalToday,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = FeedSlice.actions;

export const {getFeed, getFeedWsStatus, getFeedError, getFeedTotal, getFeedTotalToday} = FeedSlice.selectors;

export type TFeedWsInternalActions = ReturnType<typeof FeedSlice.actions[keyof typeof FeedSlice.actions]>;
