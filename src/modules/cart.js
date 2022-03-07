const CART_ADD = 'CART_ADD';
const CART_REMOVE = 'CART_REMOVE';

export const cart_newData = (payload) => ({ type: CART_ADD, data: payload });
export const cart_remove = (payload) => ({ type: CART_REMOVE, data: payload });

const cartInitialState = { count: false };

export const cart = (state = cartInitialState, action) => {
	switch (action.type) {
		case CART_ADD:
			return { cartCount: action.data };
		case CART_REMOVE:
			return { cartCount: action.data };
		default:
			return state;
	}
};
