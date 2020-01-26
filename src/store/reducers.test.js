import * as Reducers from './reducers';
import * as Types from './types';

describe('reducers testing', () => {

    describe('User reducer', () => {
        it('Handle a new SET_USER action', () => {
            const emptyUser = Reducers.initialState.user;
            const executedAction = {
                type: Types.SET_USER,
                user: { firstname: 'Gabriel', surname: 'Maillo Sevilla', tag: 'lifestyle' }
            };
            
            const expectedResult = { firstname: 'Gabriel', surname: 'Maillo Sevilla', tag: 'lifestyle' };

            expect(Reducers.user(emptyUser, executedAction)).toEqual(expectedResult);
        });
    });

    describe('Adverts reducer', () => {
        it('Check initial adverts state', () => {   
            const emptyAdverts = Reducers.initialState.adverts;
            const executedAction = {};
            const expectedResult = [];
            
            expect(Reducers.adverts(emptyAdverts, executedAction)).toEqual(expectedResult);
        });

    });
});