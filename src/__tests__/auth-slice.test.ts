import { authLogin, authLogout, authProfile, authRegister } from '../services/auth/auth-actions';
import { authSlice, initialState } from '../services/auth/auth-slice';

const userData = {
    name: 'testname', 
    email: 'test@mail.com',
}

describe('Redux store and actions. Auth Slice.', () => {
    it('Should return the initial state', () => {
        expect(authSlice.reducer(undefined, {type: ''})).toEqual(initialState);
    })

    it('Auth set correctly', () => {
        const action = {type: authSlice.actions.setIsAuthChecked.type, payload: true};
        
        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, isAuthChecked: true});
    })

    it('User set correctly', () => {
        const action = {type: authSlice.actions.setUser.type, payload: {name: 'test1', email: 'test2'}};

        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, user: {name: 'test1', email: 'test2'}});
    })

    it('Login fulfilled', () => {
        const action = {type: authLogin.fulfilled.type, payload: userData};

        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, user: userData});
    })

    it('Login rejected', () => {
        const action = {type: authLogin.rejected.type};

        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, user: null});
    })

    it('Logout fulfilled', () => {
        const action = {type: authLogout.fulfilled.type};

        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, user: null});
    })

    it('Register fulfilled', () => {
        const action = {type: authRegister.fulfilled.type, payload: userData};

        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, user: userData});
    })

    it('Register rejected', () => {
        const action = {type: authRegister.rejected.type};

        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, user: null});
    })

    it('Profile fulfilled', () => {
        const action = {type: authProfile.fulfilled.type, payload: userData};

        const state = authSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, user: userData});
    })
})
