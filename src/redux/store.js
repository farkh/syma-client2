import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistedState = localStorage.getItem('SymaState')
	? JSON.parse(localStorage.getItem('SymaState'))
	: {};
const middleware = [thunk];

const store = createStore(
	rootReducer,
	persistedState,
	compose(
		applyMiddleware(...middleware)
	),
);

export default store;
