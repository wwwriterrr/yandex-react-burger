import { authSlice, initialState } from '../services/auth/auth-slice';

describe('Redux store and actions. Auth Slice.', () => {
    it('Should return the initial state', () => {
        expect(authSlice.reducer(undefined, {type: ''})).toEqual(initialState);
    })
})
