const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const user_login = (payload) => ({ type: LOGIN, data: payload });
export const user_logout = () => ({ type: LOGOUT });

<<<<<<< HEAD
const loginInitialState = { login: false, name: '' };
=======
const loginInitialState = { login: false };
>>>>>>> psps/seoyoon

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
