import { createAction } from "@reduxjs/toolkit";

export const feedWsConnect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');

export const feedWsDisconnect = createAction('FEED_DISCONNECT');

export type TFeedWsExternalActions = ReturnType<typeof feedWsConnect> | ReturnType<typeof feedWsDisconnect>;
