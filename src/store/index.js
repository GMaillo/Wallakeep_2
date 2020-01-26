import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools;

export const storeConfiguration = preloadedState => {
    const reducer = combineReducers(reducers);
    const middlewares = [ thunkMiddleware, loggerMiddleware ];
    return createStore(reducer, preloadedState, composeEnhancers( applyMiddleware(...middlewares) ));
};
