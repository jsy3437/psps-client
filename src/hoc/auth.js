import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { user_login, user_logout } from '../modules/user';
import { authCheck } from '../controller/user';

const Auth = (SpecificComponent, option, adminRoute = null) => {
	const dispatch = useDispatch();
	function AuthenticationCheck() {
		// useEffect(() => {
		// 	authCheck().then((res) => {
		// 		if (res.data.success) {
		// 			return dispatch(user_login(res.data.nickname));
		// 		} else {
		// 			return dispatch(user_logout());
		// 		}
		// 	});
		// }, []);

		return <SpecificComponent />;
	}

	return AuthenticationCheck;
};

export default Auth;
