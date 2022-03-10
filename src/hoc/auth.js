import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { user_login, user_logout } from '../modules/user';
import * as _user from '../controller/user';

export default function Auth(SpecificComponent, option, adminRoute = null) {
	const dispatch = useDispatch();

	function AuthenticationCheck() {
		useEffect(() => {
			_user
				.authCheck()
				.then((res) => {
					let isAuth = false;
					const { success, name } = res.data;
					if (success) {
						isAuth = true;
						dispatch(user_login(name));
					} else {
						dispatch(user_logout());
					}
					return isAuth;
				})
				.then((isAuth) => {
					if (option) {
						if (!isAuth) {
							alert('로그인 후 이용가능.');
						}
					} else if (option === false) {
						if (isAuth) {
							alert('이미 로그인 중.');
						}
					}
				});
		}, []);

		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
