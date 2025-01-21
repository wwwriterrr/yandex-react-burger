import { type TApiIngredient } from '../core/type';
import { createOrder, getIngredients, ingredientsSlice, initialState } from '../services/ingredients/ingredientsSlice';

const ingredient: TApiIngredient = {
    _id: 'testId',
    name: 'testName',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'image',
    image_mobile: 'image',
    image_large: 'image',
    __v: 1,
}

const ingredient2: TApiIngredient & {rowId: string} = {
    ...ingredient,
    rowId: 'test',
}

describe('Ingredients Slice.', () => {
    it('Should return the initial state', () => {
        expect(ingredientsSlice.reducer(undefined, {type: ''})).toEqual(initialState);
    })

    it('Fetch ingredients fulfilled', () => {
        const action = {type: getIngredients.fulfilled.type, payload: [ingredient]};
        
        const state = ingredientsSlice.reducer(initialState, action);

        expect(state.ingredients).toEqual([ingredient]);

        expect(state.ingredientsMap.size).toEqual(1);

        expect(state.constructor.length).toEqual(2);
    })

    it('Fetch ingredients pending', () => {
        const action = {type: getIngredients.pending.type};

        const state = ingredientsSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, ingredientsLoading: true, ingredientsError: null});
    })

    it('Fetch ingredients rejected', () => {
        const action = {type: getIngredients.rejected.type, payload: 'Test'};

        const state = ingredientsSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, ingredientsLoading: false, ingredientsError: 'Test'});
    })

    it('Create order pending', () => {
        const action = {type: createOrder.pending.type};

        const state = ingredientsSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, orderLoading: true});
    })

    it('Create order rejected', () => {
        const action = {type: createOrder.rejected.type};

        const state = ingredientsSlice.reducer(initialState, action);

        expect(state).toEqual({...initialState, orderLoading: false});
    })

    it('Create order fulfilled', () => {
        const prevState = {...initialState, ingredients: [ingredient]};

        const action = {type: createOrder.fulfilled.type};

        const state = ingredientsSlice.reducer(prevState, action);

        expect(state.orderLoading).toBeFalsy();

        expect(state.constructor.length).toEqual(2);
    })

    it('Remove from constructor', () => {
        const prevState = {...initialState, constructor: [ingredient2, ingredient2, ingredient2]};

        const action = {type: ingredientsSlice.actions.removeConstructorItem.type, payload: 1};

        const state = ingredientsSlice.reducer(prevState, action);

        expect(state).toEqual({...prevState, constructor: [ingredient2, ingredient2]});
    })

    it('Add to constructor', () => {
        const prevState = {...initialState, ingredients: [ingredient], constructor: [ingredient2, ingredient2]}

        const action = {type: ingredientsSlice.actions.addToConstructor.type, payload: {ingredientId: 'testId'}};

        const state = ingredientsSlice.reducer(prevState, action);

        expect(state.constructor.length).toEqual(3);
    })

    it('Move constructor items', () => {
        const newIngredient = {...ingredient2, rowId: 'test2'};

        const prevState = {...initialState, constructor: [ingredient2, newIngredient]};

        const action = {type: ingredientsSlice.actions.moveConstructorItem.type, payload: {dragIndex: 1, hoverIndex: 0}};

        const state = ingredientsSlice.reducer(prevState, action);

        expect(state.constructor[0].rowId).toEqual('test2');
    })

    it('Replace bun', () => {
        const newBun = {...ingredient, _id: 'testId2'};

        const prevState = {...initialState, ingredients: [ingredient, newBun], constructor: [ingredient2, ingredient2]};

        const action = {type: ingredientsSlice.actions.replaceConstructorBun.type, payload: {pos: 'top', ingredientId: 'testId2'}};

        const state = ingredientsSlice.reducer(prevState, action);

        expect(state.constructor[0]._id).toEqual('testId2');
    })
})
