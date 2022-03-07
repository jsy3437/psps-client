const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const user_login = (payload) => ({ type: LOGIN, data: payload });
export const user_logout = () => ({ type: LOGOUT });

const loginInitialState = { login: false };

export const user = (state = loginInitialState, action) => {
	switch (action.type) {
		case LOGIN:
			return { login: true, name: action.data };
		case LOGOUT:
			return loginInitialState;
		default:
			return state;
	}
};
