import { createSlice } from '@reduxjs/toolkit';
import { type TOrderItem, WebsocketStatus } from '../../core/type';


export type TFeedStore = {
    status: WebsocketStatus,
    messages: TOrderItem[],
    connectionError: string | null,
}

const initialState: TFeedStore = {
    status: WebsocketStatus.OFFLINE,
    messages: [],
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
        wsMessage: (state, action) => {
            
        }
    },
    selectors: {
        getFeed: state => state.messages,
        getFeedError: state => state.connectionError,
        getFeedWsStatus: state => state.status,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = FeedSlice.actions;

export const {getFeed, getFeedWsStatus, getFeedError} = FeedSlice.selectors;

export type TFeedWsInternalActions = ReturnType<typeof FeedSlice.actions[keyof typeof FeedSlice.actions]>;
