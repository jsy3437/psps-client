import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { user_login, user_logout } from '../modules/user';
import * as _user from '../controller/user';
import { useHistory } from 'react-router-dom';

export default function Auth(SpecificComponent, option, adminRoute = null) {
	const dispatch = useDispatch();
	const history = useHistory();

	function AuthenticationCheck() {
		useEffect(() => {
			_user.authCheck().then((res) => {
				let isAuth = false;
				const { success, name } = res.data;

				if (success) {
					isAuth = true;
					dispatch(user_login(name));
				} else {
					dispatch(user_logout());
				}
				return isAuth;

				// })
				// .then((isAuth) => {
				// 	if (option) {
				// 		if (!isAuth) {
				// 			history.push('/login');
				// 			alert('로그인 후 이용가능.');
				// 		}
				// 	} else if (option === false) {
				// 		if (isAuth) {
				// 			history.push('/');
				// 			alert('이미 로그인 중.');
				// 		}
				// 	}
			});
		}, []);

		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
