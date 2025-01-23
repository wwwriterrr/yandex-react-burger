import { TOrderItem, WebsocketStatus } from '../core/type';
import { FeedSlice, initialState } from '../services/feed/feed-slice';

describe('Feed Slice.', () => {
    it('Should return the initial state', () => {
        expect(FeedSlice.reducer(undefined, {type: ''})).toEqual(initialState);
    })

    it('WS connecting', () => {
        const action = {type: FeedSlice.actions.wsConnecting.type};

        const state = FeedSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, status: WebsocketStatus.CONNECTING});
    })

    it('WS open', () => {
        const action = {type: FeedSlice.actions.wsOpen.type};

        const state = FeedSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, status: WebsocketStatus.ONLINE, connectionError: null});
    })

    it('WS close', () => {
        const action = {type: FeedSlice.actions.wsClose.type};

        const state = FeedSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, status: WebsocketStatus.OFFLINE});
    })

    it('WS error', () => {
        const action = {type: FeedSlice.actions.wsError.type, payload: 'Test'};

        const state = FeedSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, connectionError: 'Test'});
    })

    it('WS message', () => {
        const order: TOrderItem = {
            _id: 'test',
            ingredients: ['test'],
            status: 'test',
            number: 1,
            name: 'test',
            createdAt: 'test',
            updatedAt: 'test',
        }

        const action = {type: FeedSlice.actions.wsMessage.type, payload: {success: true, orders: [order], total: 1313, totalToday: 13}};

        const state = FeedSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, messages: [order], total: 1313, totalToday: 13});
    })
})
