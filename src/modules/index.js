import { combineReducers } from 'redux';
import { user } from './user';
import { cart } from './cart';

export const rootReducer = combineReducers({
	user,
	cart,
});
