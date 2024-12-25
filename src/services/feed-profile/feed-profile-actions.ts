import { createAction } from "@reduxjs/toolkit";

export const feedProfileWsConnect = createAction<string, 'FEED_PROFILE_CONNECT'>('FEED_PROFILE_CONNECT');

export const feedProfileWsDisconnect = createAction('FEED_PROFILE_DISCONNECT');

export type TFeedProfileWsExternalActions = ReturnType<typeof feedProfileWsConnect> | ReturnType<typeof feedProfileWsDisconnect>;
